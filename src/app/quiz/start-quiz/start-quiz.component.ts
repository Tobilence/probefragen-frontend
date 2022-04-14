import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, shareReplay, Subscriber, Subscription } from 'rxjs';
import { Course } from 'src/app/core/course';
import { QuestionTag } from 'src/app/core/question-tag';
import { CourseService } from 'src/app/courses/service/course.service';
import { QuizService } from '../quiz.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  course: Course | null = null

  questionSliderValue = 10
  maxQuestions = 10
  selectedTags: Array<QuestionTag> = []
  loading = false
  error: string | null = null

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute, private router: Router, private courseService: CourseService, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {

      this.courseService.loadCoursesIfNecessary().then((courses) => {
        this.course = courses.filter(c => c.id == +params.get('id')!)[0]
        this.questionSliderValue = this.course.multipleChoiceQuestions.length >= 30 ? 30 : this.course.multipleChoiceQuestions.length
        this.maxQuestions = this.questionSliderValue
      })
    })
  }

  handleTagChange(tags: Array<QuestionTag>) {
    this.selectedTags = tags

    // recalculate slider length
    let maxQuestions = this.calculateMaximumSliderLength()
    if(maxQuestions >= 5) {
      this.maxQuestions = maxQuestions
      this.questionSliderValue = maxQuestions
    }
  }

  calculateMaximumSliderLength() {
    if (this.course === null)
      return -1

    if (this.selectedTags.length === 0)
      return this.maxQuestions

    let temp = []

    this.course.multipleChoiceQuestions.forEach(mc => {
      let added = false
      mc.tags.map(t => t.id).forEach( tagId => {
        if (this.selectedTags.map(t => t.id).includes(tagId) && !added) {
          temp.push(mc)
          added = true
        }
      })
    })
    return temp.length
  }

  handleStartQuiz() {

    let maxNumberOfQuestions = this.calculateMaximumSliderLength()

    this.loading = true
    this.quizService.loadQuiz(this.course!.id, this.questionSliderValue, maxNumberOfQuestions < 5 ? [] : this.selectedTags)
      .then(quiz => {
        this.router.navigate(
          [],
          {
            relativeTo: this.activatedRoute,
            queryParams: { status: 'active' },
            queryParamsHandling: 'merge'
        })
      })
      .catch(error => {
        this.error = error
      })
  }
}
