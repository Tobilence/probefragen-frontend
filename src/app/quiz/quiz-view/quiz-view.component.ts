import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { MCQuestion } from 'src/app/core/mcquestion';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.css']
})
export class QuizViewComponent implements OnInit {

  currentQuestion: MCQuestion | null = null
  progressSubscription: Subscription | null = null
  finishedSubscription: Subscription | null = null

  timer: number = 0
  interval: any

  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.interval = setInterval(() => {
      this.timer += 1000
    }, 1000)

    this.progressSubscription = this.quizService.progress.subscribe((progress) => {
      if (progress === -1) {
        this.router.navigate(
          [],
          {
            relativeTo: this.activatedRoute,
            queryParams: { status: 'start' },
            queryParamsHandling: 'merge'
        })
      }
      this.currentQuestion = this.quizService.getQuestionAt(progress)
    })

    this.finishedSubscription = this.quizService.quizDone.subscribe(isDone => {
      if (isDone) {
        this.quizService.totalTime = this.timer / 1000
        this.router.navigate(
          [],
          {
            relativeTo: this.activatedRoute,
            queryParams: { status: 'done' },
            queryParamsHandling: 'merge'
        })
      }
    })
  }

  // get applied to progressbar width
  calculateProgress(): string {
    return this.quizService.calculateProgressPercentage() + "%"
  }

  ngOnDestroy() {
    clearInterval(this.timer)
  }
}
