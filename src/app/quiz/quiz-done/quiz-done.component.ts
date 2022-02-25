import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MCAnswerOption } from 'src/app/core/mcanswer-option';
import { AnsweredMCQuestion, QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-done',
  templateUrl: './quiz-done.component.html',
  styleUrls: ['./quiz-done.component.css']
})
export class QuizDoneComponent implements OnInit {

  score: number = 0
  givenAnswers: Array<AnsweredMCQuestion> = []

  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.score = this.quizService.totalScore
    this.givenAnswers = this.quizService.answeredQuestions
    if (this.givenAnswers.length == 0) {
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: { status: 'start' },
          queryParamsHandling: 'merge'
      })
    }
  }


  generateMcQuestion(answer: AnsweredMCQuestion) {
    return this.quizService.getQuestionById(answer.mcQuestionId)
  }

  calculateGrade() {
    let percentage = this.score / this.givenAnswers.length
    if (percentage < .6) {
      return 5
    } else if (percentage < .7) {
      return 4
    } else if (percentage < .8) {
      return 3
    } else if (percentage < .9) {
      return 2
    }
    return 1
  }

  calculateTotalTime() {
    return this.quizService.totalTime * 1000
  }

  calculateQuestionAverageTime() {
    return (this.quizService.totalTime / this.quizService.answeredQuestions.length) * 1000
  }

  highlightGradeColor() {
    let quizLength = this.quizService.answeredQuestions.length
    if (this.score < quizLength / 2)
      return 'red'
    if (this.score < quizLength * 0.75)
      return 'orange'
    return 'green'
  }

  highlightTimeColor() {

    let averageAnswerTime = this.calculateQuestionAverageTime() / 1000
    if (averageAnswerTime > 3*60)
      return 'red'
    if (averageAnswerTime > 2*60)
      return 'orange'
    return 'green'
  }
}
