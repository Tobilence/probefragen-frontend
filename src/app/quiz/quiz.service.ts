import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, empty, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MCQuestion } from '../core/mcquestion';

export interface AnsweredMCQuestion {
  mcQuestionId: number,
  score: number,
  givenAnswers: Array<{id: number, givenAnswer: boolean, evaluation: boolean}>
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  quiz: Array<MCQuestion> = []
  progress: BehaviorSubject<number> = new BehaviorSubject(-1)
  answeredQuestions: Array<AnsweredMCQuestion> = []

  totalScore: number = 0
  totalTime: number = -1

  quizDone: EventEmitter<boolean> = new EventEmitter()

  constructor() { }

  async loadQuiz(courseId: number, numberOfQuestions: number) {
    let request = await fetch(environment.BASE_URL + "/quiz", {
      headers: {"Content-Type": "application/json"},
      method: "POST",
      body: JSON.stringify({courseId, numberOfQuestions})
    })
    let data = await request.json()
    this.quiz = data
    this.progress.next(0)
    return this.quiz
  }

  calculateProgressPercentage() {
    return (this.progress.getValue() / this.quiz.length) * 100
  }

  getQuestionAt(idx: number) {
    return this.quiz[idx]
  }

  submitAnswer(answer: AnsweredMCQuestion) {
    console.log("submit")
    this.totalScore += answer.score
    this.answeredQuestions.push(answer)
  }

  requestNextQuestion() {
    if (this.progress.value === this.quiz.length -1) {
      this.quizDone.emit(true)
    } else {
      this.progress.next(this.progress.getValue() + 1)
    }
  }

  getQuestionById(id: number) {
    return this.quiz.filter((q) => q.id === id)[0]
  }

  log() {
    console.log("done",this.answeredQuestions)
  }
}
