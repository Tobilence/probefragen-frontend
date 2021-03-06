import { Component, Input, OnInit } from '@angular/core';
import { CourseDetailService, GenericQuestion } from 'src/app/courses/service/course-detail.service';

@Component({
  selector: 'question-list-item',
  templateUrl: './question-list-item.component.html',
  styleUrls: ['./question-list-item.component.css']
})
export class QuestionListItemComponent implements OnInit {

  @Input() mcQuestion: GenericQuestion | null = null

  questionTags:string[] = []

  constructor(private courseDetailService: CourseDetailService) { }

  ngOnInit(): void {
    if (this.mcQuestion?.isMultipleChoice) {
      this.questionTags = this.courseDetailService.getMCQuestion(this.mcQuestion.id).tags.map(tag => tag.name)
    }
  }
}
