import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelChoiceComponent } from './excel-choice.component';

describe('ExcelChoiceComponent', () => {
  let component: ExcelChoiceComponent;
  let fixture: ComponentFixture<ExcelChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExcelChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
