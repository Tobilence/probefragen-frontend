import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/core/course';
import { CourseService } from 'src/app/courses/service/course.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  selectedCourseId: number = -1
  courses: Promise<Array<Course>> | null = null

  constructor(private courseService: CourseService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.courses = this.courseService.getCourses()
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedCourseId = params["preselectedCourse"]
    })
  }

}
