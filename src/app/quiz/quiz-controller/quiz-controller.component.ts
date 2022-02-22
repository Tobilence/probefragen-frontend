import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quiz-controller',
  templateUrl: './quiz-controller.component.html',
  styleUrls: ['./quiz-controller.component.css']
})
export class QuizControllerComponent implements OnInit {

  activeStatus: string = ""

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.activeStatus = params.get("status")!
    })
  }

}
