import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/core/course';
import { MCAnswerOption } from 'src/app/core/mcanswer-option';
import { MCQuestion } from 'src/app/core/mcquestion';
import { CourseService } from 'src/app/courses/service/course.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-mc-dialog',
  templateUrl: './add-mc-dialog.component.html',
  styleUrls: ['./add-mc-dialog.component.css']
})
export class AddMcDialogComponent implements OnInit {

  @Input() selectedCourse: number = -1
  question: MCQuestion = new MCQuestion(null, "", "", null, [new MCAnswerOption(null, "", false), new MCAnswerOption(null, "", false), new MCAnswerOption(null, "", false)])

  snackbarDetails: {message: string, color: string} | null = null

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    this.question.answerOptions.forEach((option) => {
      if (option.answerText == "") {
        this.showSnackbar({ message: "Bitte fülle alle Antwortmöglichkeiten aus!", color: "#f24141"}, 2500)
        return
      }
    })

    if(form.status == "INVALID") {
      this.showSnackbar({ message: "Bitte fülle alle Antowrtfelder aus!", color: "#f24141"}, 2500)
      return
    }

    if(this.selectedCourse == -1) {
      this.showSnackbar({ message: "Bitte wähle eine VO aus, zu der diese Frage dazugehört!", color: "#f24141"}, 2500)
      return
    }

    const body = { ...this.question, courseId: this.selectedCourse}
    this.courseService.saveQuestion(this.question, this.selectedCourse)
      .then(() => {
        this.showSnackbar({ message: "Die Frage wurde erfolgreich gespeichert!", color: "var(--green)"}, 2500)
      })
      .catch(() => {
        this.showSnackbar({message: "Ein Fehler ist aufgetreten beim speichern!", color: "#f24141"}, 2500)
      })
  }

  showSnackbar(snackbar: {message: string, color: string}, closeAfter: number) {
    this.snackbarDetails = snackbar
    setTimeout(() => {
      this.snackbarDetails = null
    }, closeAfter);
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
