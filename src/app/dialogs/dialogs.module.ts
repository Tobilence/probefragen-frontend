import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesModule } from '../courses/courses.module';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule }   from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatPseudoCheckboxModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';





@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoursesModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatPseudoCheckboxModule,
    MatChipsModule
  ]
})
export class DialogsModule { }
