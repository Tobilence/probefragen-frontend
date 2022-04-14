import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, empty, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MCQuestion } from '../core/mcquestion';
import { QuestionTag } from '../core/question-tag';

export interface AnsweredMCQuestion {
  mcQuestionId: number,
  score: number,
  givenAnswers: Array<{id: number, givenAnswer: boolean, evaluation: boolean, reDecisions: number}>
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

  async loadQuiz(courseId: number, numberOfQuestions: number, questionTags: Array<QuestionTag>) {
    console.log(questionTags)
    let request = await fetch(environment.BASE_URL + "/quiz", {
      headers: {"Content-Type": "application/json"},
      method: "POST",
      body: JSON.stringify({courseId, numberOfQuestions, questionTags})
    })
    let data = await request.json()
    if (request.status === 200) {
      this.quiz = data
      this.progress.next(0)
      return this.quiz
    } else {
      throw new Error(data.error)
    }
  }

  calculateProgressPercentage() {
    return (this.progress.getValue() / this.quiz.length) * 100
  }

  getQuestionAt(idx: number) {
    return this.quiz[idx]
  }

  submitAnswer(answer: AnsweredMCQuestion) {
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

  async sendStatistics(statObject: any): Promise<number>{
    const res = await fetch(environment.BASE_URL + "/statistics/saveone", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(statObject)
    })
    return res.status
  }
}
