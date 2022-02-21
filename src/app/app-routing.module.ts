import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './courses/course-list/course-list.component';
import { CourseComponent } from './courses/course/course.component';
import { AddQuestionComponent } from './dialogs/add-question/add-question.component';

const routes: Routes = [
  { path: 'add-question', component: AddQuestionComponent },
  { path: 'courses/:id', component: CourseComponent },
  { path: 'courses', component: CourseListComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
