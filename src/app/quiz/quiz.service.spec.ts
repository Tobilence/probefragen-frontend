import { TestBed } from '@angular/core/testing';
import { AnsweredMCQuestion } from './quiz.service'

import { QuizService } from './quiz.service';

describe('QuizService', () => {
  let service: QuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should submit answer', () => {
    // given
    let answer = {
      mcQuestionId: 1,
      score: .7,
      givenAnswers: []
    }

    // when
    service.submitAnswer(answer)

    //then
    expect(service.answeredQuestions.length).toEqual(1)
  })

});
