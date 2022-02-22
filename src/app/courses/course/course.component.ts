import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Course } from 'src/app/core/course';
import { CourseService } from '../service/course.service';

export interface MixedQuestion {
  id: number,
  isMultipleChoice: boolean,
  questionText: string
}

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: Promise<Course> | null = null

  mixedQuestions: Array<MixedQuestion> = []
  selectedQuestion: MixedQuestion | null = null;

  questionIds: Array<number> = [] //a list of all question ID's (already viewed questions will be removed once they are clicked on)

  private queryListener: Subscription | null = null;
  private routeListener: Subscription | null = null;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private courseService: CourseService) { }

  ngOnInit(): void {

    this.queryListener = this.activatedRoute.queryParams.subscribe((params) => {
      if (params["question"] === undefined) {
        this.selectedQuestion = null
      }
    })

    this.routeListener = this.activatedRoute.paramMap.subscribe((params => {

      this.course = this.courseService.getCourseById(+params.get('id')!)

      // create a randomized lsit of shuffled mc & open questions
      this.course.then(course => {
        course.multipleChoiceQuestions.forEach(question => {
          console.log("Loop")
          this.mixedQuestions.push({
            id: question.id!,
            isMultipleChoice: true,
            questionText: question.questionText
          })
        });

        course.openEndedQuestions.forEach(question => {
          console.log("Loop1")
          this.mixedQuestions.push({
            id: question.id!,
            isMultipleChoice: false,
            questionText: question.questionText
          })
        })
      })
      .then(() => {
        console.log("Shuffle...")
        this.mixedQuestions = this.shuffle(this.mixedQuestions)
        // this.selectedQuestion = this.mixedQuestions[0] -- uncomment only for developing purpose
        this.questionIds = this.mixedQuestions.map(q => q.id)
        console.log("QuestionIDS: ", this.questionIds)
      })

    }))
  }

  shuffle(array: Array<any>) {
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

  handleQuestionSelect(question: MixedQuestion) {
    this.questionIds = this.questionIds.filter(qid => qid !== question.id)
    this.selectedQuestion = question
  }

  public handleNextQuestion(): MixedQuestion {
    let id = this.questionIds[this.questionIds.length - 1]
    this.questionIds.pop()
    this.selectedQuestion = this.mixedQuestions.filter(q => q.id === id)[0]

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: { question: id },
        queryParamsHandling: 'merge'
    })

    return this.selectedQuestion
  }

  async getQuestion(question: MixedQuestion) {
    if (question.isMultipleChoice) {
      let course = await this.course!
      return course.multipleChoiceQuestions.filter(q => q.id === question.id)[0]
    } else {
      let course = await this.course!
      return course.openEndedQuestions.filter(q => q.id === question.id)[0]
    }
  }

  ngOnDestroy() {
    console.log("dest")
    this.queryListener?.unsubscribe()
    this.routeListener?.unsubscribe()
  }
}
