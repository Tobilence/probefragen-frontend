import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/core/course';
import { CourseService } from 'src/app/courses/service/course.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {

  courses: Array<Course> = []

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.loadCoursesIfNecessary().then(courses => {
      this.courses = courses
    })
  }

  createContentText(course: Course) {
    if (course.multipleChoiceQuestions.length < 10)
      return "Zu wenige Fragen um ein Quiz durchzuführen!"
    else
      return course.multipleChoiceQuestions.length + " Fragen"
  }

  isValidQuiz(course: Course) {
    return course.multipleChoiceQuestions.length >= 10
  }
}
