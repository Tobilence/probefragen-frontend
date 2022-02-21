import { Injectable } from '@angular/core';
import { Course } from 'src/app/core/course';
import { MCQuestion } from 'src/app/core/mcquestion';
import { Question } from 'src/app/core/question';
import { environment } from 'src/environments/environment';

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

  async saveQuestion(question: MCQuestion, courseId: number): Promise<MCQuestion> {
    const body: any = {...question, courseId}

    let result = await fetch(environment.BASE_URL + "/questions/mc", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(body)
    })

    if (result.status !== 200) {
      throw new Error("An Error occurred while trying to save the MC Question!")
    }

    let data: MCQuestion = await result.json()
    // TODO - add MC Question to course
    return data
  }
}
