import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddMcDialogComponent } from './dialogs/add-mc-dialog/add-mc-dialog.component';
import { AddQuestionComponent } from './dialogs/add-question/add-question.component';
import {MatSelectModule} from '@angular/material/select';
import { AddOpenQuestionDialogComponent } from './dialogs/add-open-question-dialog/add-open-question-dialog.component';
import { QuestionListItemComponent } from './question/question-list-item/question-list-item.component';
import { CoreModule } from './core/core.module';
import { CourseComponent } from './courses/course/course.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseListItemComponent } from './courses/course-list-item/course-list-item.component';
import { QuestionDetailViewComponent } from './question/question-detail-view/question-detail-view.component';
import { McQuestionComponent } from './question/mc-question/mc-question.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddMcDialogComponent,
    AddQuestionComponent,
    AddOpenQuestionDialogComponent,
    QuestionListItemComponent,
    CourseComponent,
    CourseListComponent,
    CourseListItemComponent,
    QuestionDetailViewComponent,
    McQuestionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
