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
}
