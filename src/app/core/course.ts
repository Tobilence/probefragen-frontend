import { MCQuestion } from "./mcquestion";
import { OpenQuestion } from "./open-question";
import { QuestionTag } from "./question-tag";

export class Course {

  constructor(
     public id: number,
     public name: string,
     public lecturerName: string,
     public intendedSemester: number,
     public multipleChoiceQuestions: Array<MCQuestion>,
     public openEndedQuestions: Array<OpenQuestion>,
     public questionTags: Array<QuestionTag>
  ){
  }
}
