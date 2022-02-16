import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course/course.component';
import { CourseListItemComponent } from './course-list-item/course-list-item.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseService } from './service/course.service';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    CourseComponent,
    CourseListItemComponent,
    CourseListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    CoreModule
  ],
  providers: [
    CourseService
  ]
})
export class CoursesModule { }
