import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, of, shareReplay, Subscription } from 'rxjs';
import { Course } from 'src/app/core/course';
import { MCAnswerOption } from 'src/app/core/mcanswer-option';
import {Location} from '@angular/common';
import { MCQuestion } from 'src/app/core/mcquestion';
import { OpenQuestion } from 'src/app/core/open-question';
import { CourseComponent } from 'src/app/courses/course/course.component';
import { CourseDetailService, GenericQuestion } from 'src/app/courses/service/course-detail.service';
import { CourseService } from 'src/app/courses/service/course.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'question-detail-view',
  templateUrl: './question-detail-view.component.html',
  styleUrls: ['./question-detail-view.component.css']
})
export class QuestionDetailViewComponent implements OnInit {

  @Input() genericQuestion: GenericQuestion | null = null

  mcQuestion: Promise<MCQuestion> | null = null
  openQuestion: Promise<OpenQuestion> | null = null

  selectedQuestion$: Subscription | null = null

  isMobile$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.TabletPortrait, Breakpoints.Handset])
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  constructor(private _location: Location, private courseDetailService: CourseDetailService, private router: Router, private activatedRoute: ActivatedRoute, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    if (this.genericQuestion!.isMultipleChoice) {
      this.mcQuestion = Promise.resolve(this.courseDetailService.getMCQuestion(this.genericQuestion!.id))
    } else {
      this.openQuestion = Promise.resolve(this.courseDetailService.getOpenQuestion(this.genericQuestion!.id))
    }

    this.selectedQuestion$ = this.courseDetailService.selectedQuestion.subscribe(question => {
      // Show different question
      if (question !== null) {
        this.mcQuestion = Promise.resolve(this.courseDetailService.getMCQuestion(question!.id))
      }
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: { question: question!.id, mc: question!.isMultipleChoice },
          queryParamsHandling: 'merge'
      })
    })
  }

  previousQuestionClicked() {
    this._location.back()
  }

  nextQuestionClicked() {
    this.courseDetailService.nextQuestion()
  }
}
