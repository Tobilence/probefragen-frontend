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
      this.courses = courses.sort((a, b) => {
        return a.multipleChoiceQuestions.length < b.multipleChoiceQuestions.length ? 1 : -1
      })
    })
  }

  createContentText(questions: number) {
    if (questions < 10)
      return "Zu wenige Fragen um dieses Quiz durchzuführen! (" + questions + " Fragen)"
    else
      return "Prüfe dein Wissen mit unseren " + questions + " Probefragen!"
  }

  isValidQuiz(course: Course) {
    return course.multipleChoiceQuestions.length >= 10
  }
}
