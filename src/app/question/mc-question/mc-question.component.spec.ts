import { ComponentFixture, TestBed } from '@angular/core/testing';

import { McQuestionComponent } from './mc-question.component';

describe('McQuestionComponent', () => {
  let component: McQuestionComponent;
  let fixture: ComponentFixture<McQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ McQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(McQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
