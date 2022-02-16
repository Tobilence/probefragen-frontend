import { Injectable } from '@angular/core';
import { Course } from 'src/app/core/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses: Array<Course> = []

  constructor() { }

  getCourses() {
    return this.loadCoursesIfNecessary()
  }

  async loadCoursesIfNecessary(): Promise<Array<Course>> {
    if (this.courses.length === 0) {
      let response = await fetch("http://localhost:8080/courses")
      this.courses = await response.json()
    }
    return this.courses;
  }

  async getCourseById(id: number): Promise<Course> {
    await this.loadCoursesIfNecessary()
    return this.courses.filter(c => c.id === id)[0]
  }
}
