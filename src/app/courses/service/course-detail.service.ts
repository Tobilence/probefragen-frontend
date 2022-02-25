import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { MCQuestion } from 'src/app/core/mcquestion';
import { OpenQuestion } from 'src/app/core/open-question';
import { CourseService } from './course.service';

export interface GenericQuestion {
  id: number,
  isMultipleChoice: boolean,
  questionText: string
}

@Injectable({
  providedIn: 'root'
})
export class CourseDetailService {

  courseId: BehaviorSubject<number> = new BehaviorSubject(-1)
  mcQuestions: Array<MCQuestion> = []
  openQuestions: Array<OpenQuestion> = []

  selectedQuestion: ReplaySubject<GenericQuestion | null> = new ReplaySubject()

  nextQuestions: Array<GenericQuestion> = []

  constructor(private couseService: CourseService) { }

  // initializes all attributes for the course
  async init(courseId: number) {
    let course = await this.couseService.getCourseById(courseId)
    this.mcQuestions = course.multipleChoiceQuestions
    this.openQuestions = course.openEndedQuestions
    this.courseId.next(courseId)
    this.nextQuestions = this.getShuffledGenericQuestions()
  }

  getShuffledGenericQuestions(): Array<GenericQuestion> {
    let result: Array<GenericQuestion> = []
    this.openQuestions.forEach(q => {
      result.push({id: q.id, isMultipleChoice: false, questionText: q.questionText})
    })
    this.mcQuestions.forEach(q => {
      result.push({id: q.id!, isMultipleChoice: true, questionText: q.questionText})
    })
    return this.shuffle(result)
  }

  selectQuestion(id:number, isMultipleChoice: boolean) {
    let question = null
    if (isMultipleChoice) {
      question = this.mcQuestions.filter(mc => mc.id == id)[0]
    } else {
      question = this.openQuestions.filter(open => open.id == id)[0]
    }
    this.selectedQuestion.next({id: id, isMultipleChoice: isMultipleChoice, questionText: question.questionText})
  }

  getMCQuestion(id: number) {
    return this.mcQuestions.filter((q) => q.id == id)[0]
  }

  getOpenQuestion(id: number) {
    return this.openQuestions.filter((q) => q.id == id)[0]
  }

  nextQuestion() {
    let randomMc = this.mcQuestions[Math.floor(Math.random()*this.mcQuestions.length)]
    this.selectedQuestion.next({id: randomMc.id!, isMultipleChoice: true, questionText: randomMc.questionText})
  }

  private shuffle(array: Array<any>) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }

  deinit() {
    this.courseId = new BehaviorSubject(-1)
    this.mcQuestions = []
    this.openQuestions = []
    this.selectedQuestion = new ReplaySubject()
    this.nextQuestions = []
  }
}
