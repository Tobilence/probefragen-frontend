import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from 'src/app/core/course';
import { MCAnswerOption } from 'src/app/core/mcanswer-option';
import { MCQuestion } from 'src/app/core/mcquestion';
import { CourseService } from 'src/app/courses/service/course.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { QuestionTag } from 'src/app/core/question-tag';

@Component({
  selector: 'app-add-mc-dialog',
  templateUrl: './add-mc-dialog.component.html',
  styleUrls: ['./add-mc-dialog.component.css']
})
export class AddMcDialogComponent implements OnInit {

  @Input() selectedCourse: number = -1
  question: MCQuestion = new MCQuestion(null, "", "", null, [], [new MCAnswerOption(null, "", false), new MCAnswerOption(null, "", false), new MCAnswerOption(null, "", false), new MCAnswerOption(null, "", false)])
  snackbarDetails: {message: string, color: string} | null = null

  @Input() availableTags:BehaviorSubject<Array<QuestionTag>> = new BehaviorSubject<Array<QuestionTag>>([])

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.availableTags.subscribe((tags) => {
      this.question.tags = []
    })
  }

  onSubmit(form: any) {
    // check how many questions were marked correct
    let numberOfCorrect = this.question.answerOptions.filter(a => a.isCorrect).length

    if (numberOfCorrect === 0) {
      this.showSnackbar({ message: "Es muss mindestens eine Antwortmöglichkeit als richtig markiert sein!", color: "#f24141"}, 2500)
      return
    }

    // check if every question has a text
    this.question.answerOptions.forEach((option) => {
      if (option.answerText == "") {
        this.showSnackbar({ message: "Bitte fülle alle Antwortmöglichkeiten aus!", color: "#f24141"}, 2500)
        return
      }
    })

    // Check if form is invalid
    if(form.status == "INVALID") {
      this.showSnackbar({ message: "Bitte fülle alle Antwortfelder aus!", color: "#f24141"}, 2500)
      return
    }

    // check if a course was selected
    if(this.selectedCourse == -1) {
      this.showSnackbar({ message: "Bitte wähle eine VO aus, zu der diese Frage dazugehört!", color: "#f24141"}, 2500)
      return
    }

    // check if there are enough answer options (>= 3)
    if (this.question.answerOptions.length < 3) {
      this.showSnackbar({ message: "Es muss mindestens 3 Antwortmöglichkeiten geben!", color: "#f24141"}, 2500)
      return
    }



    this.courseService.saveQuestion(this.question, this.selectedCourse)
    .then(() => {
      this.question =  new MCQuestion(null, "", "", null, [], [new MCAnswerOption(null, "", false), new MCAnswerOption(null, "", false), new MCAnswerOption(null, "", false), new MCAnswerOption(null, "", false)])
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

  onBadgeChanged(event: any) {
    if (event.target.checked) {
      this.question.badge = "ORIGINAL" // altfrage
    } else {
      this.question.badge = null
    }
  }

}
