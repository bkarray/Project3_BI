import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefrenceFieldComponent } from './refrence-field.component';

describe('RefrenceFieldComponent', () => {
  let component: RefrenceFieldComponent;
  let fixture: ComponentFixture<RefrenceFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefrenceFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefrenceFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
