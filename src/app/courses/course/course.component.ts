import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, shareReplay, Subscription } from 'rxjs';
import { Course } from 'src/app/core/course';
import { CourseDetailService, GenericQuestion } from '../service/course-detail.service';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: Promise<Course> | null = null

  originalQuestions: Array<GenericQuestion> = []
  genericQuestions: Array<GenericQuestion> = []
  selectedQuestion: GenericQuestion | null = null;

  activeTags: Array<string> = []

  private selectedQuestion$: Subscription | null = null;
  private queryListener: Subscription | null = null;
  private routeListener: Subscription | null = null;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.TabletPortrait, Breakpoints.Handset])
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private activatedRoute: ActivatedRoute, private breakpointObserver: BreakpointObserver, private courseService: CourseService, private courseDetailService: CourseDetailService) {}

  ngOnInit(): void {
    this.routeListener = this.activatedRoute.paramMap.subscribe((params => {
      this.courseService.loadCoursesIfNecessary()
      .then(() => {
        this.courseDetailService.init(+params.get('id')!)
        .then(() => {
          this.course = this.courseService.getCourseById(+params.get('id')!)
          this.genericQuestions = this.courseDetailService.getShuffledGenericQuestions()
          this.originalQuestions = this.genericQuestions
          this.subscribeToQuery()
        })
      })
    }))

    this.selectedQuestion$ = this.courseDetailService.selectedQuestion.subscribe((question) => {
      this.selectedQuestion = question
    })
    this.activeTags = []
  }

  // checks the query & loads the corresponding question
  subscribeToQuery() {
    this.queryListener = this.activatedRoute.queryParams.subscribe((params) => {
      if (params["question"] === undefined) {
        this.courseDetailService.selectedQuestion.next(null)
      } else {
        this.courseDetailService.selectQuestion(params["question"], params["mc"])
      }
    })
  }

  handleQuestionSelect(question: GenericQuestion) {
    // TODO (add / remove course viewed questions)
  }

  private calculateRelevantGenericQuestions(): Array<GenericQuestion> {
    let temp: Array<GenericQuestion> = []
    if (this.activeTags.length == 0) {
      return this.originalQuestions
    } else {
      this.genericQuestions.forEach(q => {
        let questionTags = q.tags.map(tag => tag.name)
        for (let tag in this.activeTags) {
          if (questionTags.includes(tag)) {
            temp.push(q)
            break
          }
      }})
      return temp
    }
  }

  onTagClick(name: string, active: boolean) {
    if (active) {
      this.activeTags.push(name)
    } else {
      this.activeTags = this.activeTags.filter(tags => tags !== name)
    }
    this.genericQuestions = this.calculateRelevantGenericQuestions()
  }

  ngOnDestroy() {
    this.selectedQuestion = null
    this.courseDetailService.deinit()
    this.selectedQuestion$?.unsubscribe()
    this.queryListener?.unsubscribe()
    this.routeListener?.unsubscribe()
  }
}
