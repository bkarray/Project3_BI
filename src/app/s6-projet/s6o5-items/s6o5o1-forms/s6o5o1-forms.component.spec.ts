import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S6o5o1FormsComponent } from './s6o5o1-forms.component';

describe('S6o5o1FormsComponent', () => {
  let component: S6o5o1FormsComponent;
  let fixture: ComponentFixture<S6o5o1FormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S6o5o1FormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o5o1FormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
