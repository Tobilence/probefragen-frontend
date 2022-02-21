import { Component, Input, OnInit } from '@angular/core';
import { MCQuestion } from 'src/app/core/mcquestion';
import { MixedQuestion } from 'src/app/courses/course/course.component';

@Component({
  selector: 'question-list-item',
  templateUrl: './question-list-item.component.html',
  styleUrls: ['./question-list-item.component.css']
})
export class QuestionListItemComponent implements OnInit {

  @Input() mcQuestion: MixedQuestion | null = null

  constructor() { }

  ngOnInit(): void {
  }

}
