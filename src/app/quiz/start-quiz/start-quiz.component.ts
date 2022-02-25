import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscriber, Subscription } from 'rxjs';
import { CourseService } from 'src/app/courses/service/course.service';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  didLoad = false
  courseName: string | null = null

  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      this.courseService.loadCoursesIfNecessary().then((courses) => {
        let course = courses.filter(c => c.id == +params.get('id')!)[0]
        this.courseName = course.name

        let quizSize = course.multipleChoiceQuestions.length >= 30 ? 30 : course.multipleChoiceQuestions.length
        this.quizService.loadQuiz(+params.get('id')!, quizSize)
          .then(() => this.didLoad = true)
      })
    })
  }
}
