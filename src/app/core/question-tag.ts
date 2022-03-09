import { MCAnswerOption } from "./mcanswer-option";

export class QuestionTag {

  constructor(
    public id: number | null,
    public name: string,
    public questionTagType: string
  ) {
  }
}
