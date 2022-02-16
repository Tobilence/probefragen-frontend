import { Question } from "./question";

export class MCQuestion {

  constructor(
    public id: number | null,
    public questionText: string,
    public source: string,
    public badge: string,
    public answerOptions: Array<[string, boolean]>
  ) {
  }
}
