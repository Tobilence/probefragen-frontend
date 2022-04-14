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
import { QuestionListItemComponent } from './question/question-list-item/question-list-item.component';
import { CoreModule } from './core/core.module';
import { CourseComponent } from './courses/course/course.component';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseListItemComponent } from './courses/course-list-item/course-list-item.component';
import { QuestionDetailViewComponent } from './question/question-detail-view/question-detail-view.component';
import { McQuestionComponent } from './question/mc-question/mc-question.component';
import { StartQuizComponent } from './quiz/start-quiz/start-quiz.component';
import { QuizViewComponent } from './quiz/quiz-view/quiz-view.component';
import { QuizControllerComponent } from './quiz/quiz-controller/quiz-controller.component';
import { QuizDoneComponent } from './quiz/quiz-done/quiz-done.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { SharedModule } from './shared/shared.module';
import { FilterQuestionsPipePipe } from './pipes/filter-questions-pipe.pipe';
import {MatSliderModule} from '@angular/material/slider';
import {MatExpansionModule} from '@angular/material/expansion';
import { HomeComponent } from './home/home.component';
import { HashLocationStrategy, LocationStrategy  } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddMcDialogComponent,
    AddQuestionComponent,
    QuestionListItemComponent,
    CourseComponent,
    CourseListComponent,
    CourseListItemComponent,
    QuestionDetailViewComponent,
    McQuestionComponent,
    StartQuizComponent,
    QuizViewComponent,
    QuizControllerComponent,
    QuizDoneComponent,
    QuizListComponent,
    FilterQuestionsPipePipe,
    HomeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
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
    CoreModule,
    MatSliderModule,
    SharedModule,
    MatExpansionModule
  ],
  providers: [
    {provide : LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
