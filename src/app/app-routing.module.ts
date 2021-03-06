import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseComponent } from './courses/course/course.component';
import { AddQuestionComponent } from './dialogs/add-question/add-question.component';
import { HomeComponent } from './home/home.component';
import { QuizControllerComponent } from './quiz/quiz-controller/quiz-controller.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';

const routes: Routes = [
  { path: 'add-question', component: AddQuestionComponent },
  { path: 'courses/:id', component: CourseComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'quiz/:id', component: QuizControllerComponent },
  { path: 'quiz', component: QuizListComponent },
  { path: 'home', component: HomeComponent},
  { path: '**', redirectTo: "/courses" }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
