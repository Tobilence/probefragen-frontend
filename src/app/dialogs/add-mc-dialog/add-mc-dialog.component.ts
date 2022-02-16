import { Component, OnInit } from '@angular/core';
import { MCQuestion } from 'src/app/core/mcquestion';

@Component({
  selector: 'app-add-mc-dialog',
  templateUrl: './add-mc-dialog.component.html',
  styleUrls: ['./add-mc-dialog.component.css']
})
export class AddMcDialogComponent implements OnInit {

  question: MCQuestion = new MCQuestion(null, "", "", "", [["", false], ["", false], ["", false]])

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(form: any) {
    console.log(this.question)
    console.log(form)
  }

  log(x: any) {
    console.log(x)
  }

  addEmptyAnswerOption() {
    this.question.answerOptions.push(["", false])
  }

  deleteAnswerOption(idx: number) {
    this.question.answerOptions.splice(idx, 1)
  }

  checkAnswerOptionError(form: any, idx: number) {
    //TODO
    return false
  }

}
