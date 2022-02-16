import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'src/app/core/course';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-course-list-item',
  templateUrl: './course-list-item.component.html',
  styleUrls: ['./course-list-item.component.css']
})
export class CourseListItemComponent implements OnInit {

  @Input() course:Course | null = null

  constructor() { }

  ngOnInit(): void {
  }

}
