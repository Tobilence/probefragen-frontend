import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailViewComponent } from './question-detail-view.component';

describe('QuestionDetailViewComponent', () => {
  let component: QuestionDetailViewComponent;
  let fixture: ComponentFixture<QuestionDetailViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionDetailViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
