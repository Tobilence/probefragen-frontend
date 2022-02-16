import { MCQuestion } from "./mcquestion";
import { OpenQuestion } from "./open-question";

export class Course {

  constructor(
     public id: number,
     public name: string,
     public lecturerName: string,
     public intendedSemester: number,
     public multipleChoiceQuestions: Array<MCQuestion>,
     public openEndedQuestions: Array<OpenQuestion>
  ){
  }
}
