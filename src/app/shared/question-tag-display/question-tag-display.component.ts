import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { QuestionTag } from 'src/app/core/question-tag';

@Component({
  selector: 'app-question-tag-display',
  templateUrl: './question-tag-display.component.html',
  styleUrls: ['./question-tag-display.component.css']
})
export class QuestionTagDisplayComponent implements OnInit {

  @Input() questionTag: QuestionTag | null = null
  @Input() active: boolean = false
  @Input() allowClicks: boolean = false
  @Output() onClickEvent = new EventEmitter<{name: string, active: boolean}>()
  constructor() { }

  ngOnInit(): void {
  }

  toggleActive() {
    if (this.allowClicks) {
      this.active = !this.active
      this.onClickEvent.emit({"name": this.questionTag!.name, "active": this.active})
    }
  }

}
