import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { QuestionTagDisplayComponent } from './question-tag-display/question-tag-display.component';
import { QuestionTagSelectComponent } from './question-tag-select/question-tag-select.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    QuestionTagDisplayComponent,
    QuestionTagSelectComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatSelectModule,
    FormsModule
  ],
  exports: [
    QuestionTagDisplayComponent,
    QuestionTagSelectComponent
  ]
})
export class SharedModule { }
