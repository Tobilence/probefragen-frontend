import { Component, OnInit } from '@angular/core';
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

  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // testing Purpose --
    // this.quizService.loadQuiz(1, 5)
    // --

    this.progressSubscription = this.quizService.progress.subscribe((progress) => {
      this.currentQuestion = this.quizService.getQuestionAt(progress)
    })

    this.finishedSubscription = this.quizService.quizDone.subscribe(isDone => {
      if (isDone) {
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

  // gety applied to progressbar width
  calculateProgress(): string {
    return this.quizService.calculateProgressPercentage() + "%"
  }
}
