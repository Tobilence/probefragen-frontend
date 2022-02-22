import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOpenQuestionDialogComponent } from './add-open-question-dialog.component';

describe('AddOpenQuestionDialogComponent', () => {
  let component: AddOpenQuestionDialogComponent;
  let fixture: ComponentFixture<AddOpenQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOpenQuestionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOpenQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
