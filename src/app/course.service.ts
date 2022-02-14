import { Injectable } from '@angular/core';

export interface Course {
  id: number,
  name: string,
  lecturerName: string
  intendedSemester: number,
  openEndedQuestions: object[],
  multipleChoiceQuestions: object[]
}

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

  getCourseById(id: number): Course {
    return this.courses.filter(c => c.id === id)[0]
  }
}
