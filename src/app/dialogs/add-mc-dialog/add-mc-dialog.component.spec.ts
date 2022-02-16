import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMcDialogComponent } from './add-mc-dialog.component';

describe('AddMcDialogComponent', () => {
  let component: AddMcDialogComponent;
  let fixture: ComponentFixture<AddMcDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMcDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMcDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
