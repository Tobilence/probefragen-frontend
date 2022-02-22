import { Component, Input, OnInit } from '@angular/core';
import { MCQuestion } from 'src/app/core/mcquestion';
import { GenericQuestion } from 'src/app/courses/service/course-detail.service';

@Component({
  selector: 'question-list-item',
  templateUrl: './question-list-item.component.html',
  styleUrls: ['./question-list-item.component.css']
})
export class QuestionListItemComponent implements OnInit {

  @Input() mcQuestion: GenericQuestion | null = null

  constructor() { }

  ngOnInit(): void {
  }

}
