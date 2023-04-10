import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManuelChoiceComponent } from './manuel-choice.component';

describe('ManuelChoiceComponent', () => {
  let component: ManuelChoiceComponent;
  let fixture: ComponentFixture<ManuelChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManuelChoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManuelChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
