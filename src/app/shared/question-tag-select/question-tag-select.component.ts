import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { QuestionTag } from 'src/app/core/question-tag';

@Component({
  selector: 'question-tag-select',
  templateUrl: './question-tag-select.component.html',
  styleUrls: ['./question-tag-select.component.css']
})
export class QuestionTagSelectComponent implements OnInit {

  @Input() label: string = "Tags"
  @Input() tags: Array<QuestionTag> = []
  @Input() hint: string | null = null // Tags helfen uns, deine Frage zu kategorisieren!

  selectedTags: Array<QuestionTag> = []

  @Output("on-change") onChange: EventEmitter<Array<QuestionTag>> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.selectedTags = []
    // You can also use categoryId.previousValue and
    // categoryId.firstChange for comparing old and new values

}

  handleChange(event: any) {
    console.log("Emitting... ", this.selectedTags)
    this.onChange.emit(this.selectedTags)
  }
}
