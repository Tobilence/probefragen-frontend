import { MCAnswerOption } from "./mcanswer-option";
import { QuestionTag } from "./question-tag";

export class MCQuestion {

  constructor(
    public id: number | null,
    public questionText: string,
    public source: string,
    public badge: string | null,
    public tags: Array<QuestionTag>,
    public answerOptions: Array<MCAnswerOption>
  ) {
  }
}
