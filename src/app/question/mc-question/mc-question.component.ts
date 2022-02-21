import { Component, Input, OnInit } from '@angular/core';
import { MCAnswerOption } from 'src/app/core/mcanswer-option';
import { MCQuestion } from 'src/app/core/mcquestion';

@Component({
  selector: 'mc-question',
  templateUrl: './mc-question.component.html',
  styleUrls: ['./mc-question.component.css']
})
export class McQuestionComponent implements OnInit {

  @Input() mcQuestion: Promise<MCQuestion> | null = null

  givenAnswers: Array<{id: number, givenAnswer: boolean, evaluation: boolean | undefined}> | null = null

  showValidation = false
  pointPercentage = 0

  constructor() { }

  ngOnInit(): void {
    console.log("mc", this.mcQuestion)
    this.mcQuestion!.then((mcQuestion) => {
      this.givenAnswers = mcQuestion.answerOptions.map(a => ({id: a.id!, givenAnswer: false, evaluation: undefined }))
    })
  }

  checkboxChange(answerOption: MCAnswerOption, event: any) {
    let state = event.target.checked
    this.givenAnswers!.filter(a => a.id === answerOption.id)[0].givenAnswer = state
    console.log(this.givenAnswers)
  }

  answerOptionClicked(answerOption: MCAnswerOption) {
    let answerObject = this.givenAnswers!.filter(a => a.id === answerOption.id)[0]
    answerObject.givenAnswer = !answerObject.givenAnswer
  }

  validateAnswers() {
    this.mcQuestion!
      .then(mcQuestion => {
        let numOfCorrectAnswers = 0
        for (let i = 0; i < mcQuestion.answerOptions.length; i++) {
          let givenAnswer = this.givenAnswers![i].givenAnswer
          let actualAnswer = mcQuestion.answerOptions[i].isCorrect
          let isCorrect = givenAnswer === actualAnswer
          this.givenAnswers![i].evaluation = isCorrect
          if (isCorrect) {
            numOfCorrectAnswers += 1
          }
        }
        this.pointPercentage = numOfCorrectAnswers / this.givenAnswers!.length
      })
      .then(() => {
        this.showValidation = true
      })
  }

  // generates a validation text for the answer with given ID
  isCorrect(id: number) {
      return this.givenAnswers?.filter(a => a.id === id)[0].evaluation
  }
}
