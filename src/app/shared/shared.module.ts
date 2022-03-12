import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { QuestionTagDisplayComponent } from './question-tag-display/question-tag-display.component';



@NgModule({
  declarations: [
    QuestionTagDisplayComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports: [
    QuestionTagDisplayComponent
  ]
})
export class SharedModule { }
