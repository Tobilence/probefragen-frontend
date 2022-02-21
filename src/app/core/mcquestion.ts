import { MCAnswerOption } from "./mcanswer-option";

export class MCQuestion {

  constructor(
    public id: number | null,
    public questionText: string,
    public source: string,
    public badge: string | null,
    public answerOptions: Array<MCAnswerOption>
  ) {
  }
}
