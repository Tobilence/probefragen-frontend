import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/core/course';
import { MCAnswerOption } from 'src/app/core/mcanswer-option';
import { MCQuestion } from 'src/app/core/mcquestion';
import { OpenQuestion } from 'src/app/core/open-question';
import { MixedQuestion } from 'src/app/courses/course/course.component';
import { CourseService } from 'src/app/courses/service/course.service';

@Component({
  selector: 'question-detail-view',
  templateUrl: './question-detail-view.component.html',
  styleUrls: ['./question-detail-view.component.css']
})
export class QuestionDetailViewComponent implements OnInit {


  @Input() isMultipleChoice: boolean | null = null
  @Input() mixedQuestion: MixedQuestion | null = null
  @Input() course: Promise<Course> | null = null
  @Input() selectNextQuestion: () => void = () => {}

  mcQuestion: Promise<MCQuestion> | null = null
  openQuestion: Promise<OpenQuestion> | null = null

  givenAnswers: Array<{id: number, givenAnswer: boolean}> | null = null

  constructor() { }

  ngOnInit(): void {
    this.course?.then(c => {
      if (this.isMultipleChoice) {
        this.mcQuestion = Promise.resolve(c.multipleChoiceQuestions.filter(q => q.id === this.mixedQuestion!.id)[0])
        this.mcQuestion.then((mcQuestion) => {
          this.givenAnswers = mcQuestion.answerOptions.map(a => ({id: a.id!, givenAnswer: false}))
        })
      } else {
        this.openQuestion = Promise.resolve(c.openEndedQuestions.filter(q => q.id === this.mixedQuestion!.id)[0])
      }
    }
    )
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

  nextQuestionClicked() {
    console.log("Next Question")
    this.selectNextQuestion()
  }
}
