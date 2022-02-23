import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/core/course';
import { __awaiter } from 'tslib';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: any[] = []

  mapped: any = {}

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses()
      .then(courses => {
        this.courses = courses
        this.courses.forEach(((course: Course, i: number) => {
          let int = course.intendedSemester
          if (this.mapped[int]) {
            this.mapped[int].push(course)
          } else {
            this.mapped[int] = [course]
          }
        }))
        this.mapped = Object.values(this.mapped)
      })
  }
}
