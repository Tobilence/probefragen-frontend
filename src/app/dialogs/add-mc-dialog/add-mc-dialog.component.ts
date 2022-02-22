import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/core/course';
import { MCAnswerOption } from 'src/app/core/mcanswer-option';
import { MCQuestion } from 'src/app/core/mcquestion';
import { CourseService } from 'src/app/courses/service/course.service';

@Component({
  selector: 'app-add-mc-dialog',
  templateUrl: './add-mc-dialog.component.html',
  styleUrls: ['./add-mc-dialog.component.css']
})
export class AddMcDialogComponent implements OnInit {

  @Input() selectedCourse: number = -1
  question: MCQuestion = new MCQuestion(null, "", "", null, [new MCAnswerOption(null, "", false), new MCAnswerOption(null, "", false), new MCAnswerOption(null, "", false)])

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const body = { ...this.question, courseId: this.selectedCourse}
    this.courseService.saveQuestion(this.question, this.selectedCourse)
  }

  addEmptyAnswerOption() {
    this.question.answerOptions.push(new MCAnswerOption(null, "", false))
  }

  deleteAnswerOption(idx: number) {
    this.question.answerOptions.splice(idx, 1)
  }

  checkAnswerOptionError(idx: number) {
    return this.question.answerOptions[idx].answerText === ""
  }
}
