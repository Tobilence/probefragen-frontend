import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTagDisplayComponent } from './question-tag-display.component';

describe('QuestionTagDisplayComponent', () => {
  let component: QuestionTagDisplayComponent;
  let fixture: ComponentFixture<QuestionTagDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionTagDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTagDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
