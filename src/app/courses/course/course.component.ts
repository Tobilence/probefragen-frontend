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

  genericQuestions: Array<GenericQuestion> = []
  selectedQuestion: GenericQuestion | null = null;

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
          this.subscribeToQuery()
        })
      })
    }))

    this.selectedQuestion$ = this.courseDetailService.selectedQuestion.subscribe((question) => {
      this.selectedQuestion = question
    })
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

  log() {
    console.log(this.genericQuestions)
  }

  handleQuestionSelect(question: GenericQuestion) {
    // TODO (add / remove course viewed questions)
  }

  ngOnDestroy() {
    this.selectedQuestion$?.unsubscribe()
    this.queryListener?.unsubscribe()
    this.routeListener?.unsubscribe()
  }
}
