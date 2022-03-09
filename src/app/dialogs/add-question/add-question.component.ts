import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Course } from 'src/app/core/course';
import { QuestionTag } from 'src/app/core/question-tag';
import { CourseService } from 'src/app/courses/service/course.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  selectedCourseId: number = -1
  courseTags: BehaviorSubject<Array<QuestionTag>> = new BehaviorSubject<Array<QuestionTag>>([])
  courses: Promise<Array<Course>> | null = null

  constructor(private courseService: CourseService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.courses = this.courseService.getCourses()
    this.activatedRoute.queryParams.subscribe(params => {
      this.selectedCourseId = params["preselectedCourse"]
      if (this.selectedCourseId != -1) {
        this.courseService.getCourseById(this.selectedCourseId).then(course => {
          this.courseTags.next(course.questionTags)
        })
      }
    })
  }

  onSelectChange(event: any) {
    this.courseService.getCourseById(event.value).then(course => {
      this.courseTags.next(course.questionTags)
    })
  }
}
