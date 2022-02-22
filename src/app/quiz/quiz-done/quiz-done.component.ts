import { Component, OnInit } from '@angular/core';
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

  constructor(private quizService: QuizService) { }

  ngOnInit(): void {
    this.score = this.quizService.totalScore
    this.quizService.log()
    this.givenAnswers = this.quizService.answeredQuestions
  }


  generateMcQuestion(answer: AnsweredMCQuestion) {
    return this.quizService.getQuestionById(answer.mcQuestionId)
  }
}
