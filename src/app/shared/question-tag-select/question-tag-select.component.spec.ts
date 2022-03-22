import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionTagSelectComponent } from './question-tag-select.component';

describe('QuestionTagSelectComponent', () => {
  let component: QuestionTagSelectComponent;
  let fixture: ComponentFixture<QuestionTagSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionTagSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionTagSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
