import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, Subscriber, Subscription } from 'rxjs';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  didLoad = false
  progressSubscription: Subscription | null = null

  constructor(private quizService: QuizService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.quizService.loadQuiz(+params.get('id')!, 5)
        .then(() => this.didLoad = true)
    })
  }

  ngOnDestroy() {
    this.progressSubscription?.unsubscribe()
  }
}
