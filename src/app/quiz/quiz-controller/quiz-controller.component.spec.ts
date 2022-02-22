import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizControllerComponent } from './quiz-controller.component';

describe('QuizControllerComponent', () => {
  let component: QuizControllerComponent;
  let fixture: ComponentFixture<QuizControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizControllerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
