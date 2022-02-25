import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, of, Subscription } from 'rxjs';
import { MCAnswerOption } from 'src/app/core/mcanswer-option';
import { MCQuestion } from 'src/app/core/mcquestion';
import { CourseDetailService } from 'src/app/courses/service/course-detail.service';
import { shuffle } from 'src/app/helpers/Shuffle';
import { QuizService } from 'src/app/quiz/quiz.service';

@Component({
  selector: 'mc-question',
  templateUrl: './mc-question.component.html',
  styleUrls: ['./mc-question.component.css']
})
export class McQuestionComponent implements OnInit {

  @Input() mcQuestion: MCQuestion | null = null
  @Input() quizMode: boolean = false
  @Input() reviewMode: boolean = false
  @Input() showValidation: boolean = false
  @Input() givenAnswers: Array<{id: number, givenAnswer: boolean, evaluation: boolean | undefined}> | null = null
  @Input("score") pointPercentage = 0

  progressSubscription: Subscription | null = null

  constructor(private quizService: QuizService, private courseDetailService: CourseDetailService) { }

  ngOnInit(): void {
    if (this.givenAnswers === null) {
      if (this.quizMode) {
        // Quiz Mode
        this.mcQuestion!.answerOptions = shuffle(this.mcQuestion!.answerOptions)
        this.quizService.progress.subscribe(progress => {
          this.givenAnswers = this.quizService.getQuestionAt(progress).answerOptions.map((opt) => ({id: opt.id!, givenAnswer: false, evaluation: undefined }))
        })
      } else {
        // Practice Mode
        this.mcQuestion!.answerOptions = shuffle(this.mcQuestion!.answerOptions)
        this.givenAnswers = this.mcQuestion!.answerOptions.map((ans) => ({id: ans.id!, givenAnswer: false, evaluation: undefined}))
      }
    }
  }

  checkboxChange(answerOption: MCAnswerOption, event: any) {
    let state = event.target.checked
    this.givenAnswers!.filter(a => a.id === answerOption.id)[0].givenAnswer = state
  }

  answerOptionClicked(answerOption: MCAnswerOption) {
    let answerObject = this.givenAnswers!.filter(a => a.id === answerOption.id)[0]
    answerObject.givenAnswer = !answerObject.givenAnswer
  }

  validateAnswers(showValidation: boolean) {
      let numOfCorrectAnswers = 0
      let markedTooMany = false
      for (let i = 0; i < this.mcQuestion!.answerOptions.length; i++) {
        let givenAnswer = this.givenAnswers![i].givenAnswer
        let actualAnswer = this.mcQuestion!.answerOptions[i].isCorrect
        let isCorrect = givenAnswer === actualAnswer
        this.givenAnswers![i].evaluation = isCorrect
        if (isCorrect) {
          numOfCorrectAnswers += 1
        }
        if (givenAnswer && !actualAnswer) {
          markedTooMany = true
        }
      }
      // check if too many questions were marked (results in 0 points!)
      if (markedTooMany) {
        this.pointPercentage = 0
      } else {
        let correctAnswers = this.mcQuestion!.answerOptions.filter(mc => mc.isCorrect).length
        let markedAnswers = this.givenAnswers!.filter(a => a.givenAnswer && a.evaluation).length
        this.pointPercentage = markedAnswers / correctAnswers
      }

      // todo - maybe this exectues too early
      this.showValidation = showValidation
  }

  // handles the next Press in quiz Mode
  nextQuestion() {
    if (!this.quizMode) {
      this.courseDetailService.nextQuestion()
      return
    }
    this.validateAnswers(false)

    let answer = {
      mcQuestionId: this.mcQuestion!.id!,
      score: this.pointPercentage,
      givenAnswers: this.givenAnswers!.map(g => ({id: g.id, givenAnswer: g.givenAnswer, evaluation: g.evaluation!}))
    }
    this.quizService.submitAnswer(answer)
    this.quizService.requestNextQuestion()
  }

  // generates a validation text for the answer with given ID
  isCorrect(id: number) {
      return this.givenAnswers?.filter(a => a.id === id)[0].evaluation
  }

  ngOnDestroy() {
    this.progressSubscription?.unsubscribe()
  }
}
