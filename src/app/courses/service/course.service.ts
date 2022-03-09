import { Injectable } from '@angular/core';
import { Course } from 'src/app/core/course';
import { MCQuestion } from 'src/app/core/mcquestion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses: Array<Course> = []

  constructor() { }

  async getCourses():Promise<Array<Course>> {
    return this.loadCoursesIfNecessary()
  }

  async loadCoursesIfNecessary(): Promise<Array<Course>> {
    if (this.courses.length === 0) {
      let response = await fetch(environment.BASE_URL + "/courses")
      this.courses = await response.json()
      console.log(this.courses)
    }

    return this.courses;
  }

  async getCourseById(id: number): Promise<Course> {
    await this.loadCoursesIfNecessary()
    console.log("A", this.courses)
    return this.courses.filter(c => c.id == id)[0]
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
    let filtered = this.courses.filter(c => c.id == courseId)
    filtered[0].multipleChoiceQuestions.push(data)
    return data
  }
}
