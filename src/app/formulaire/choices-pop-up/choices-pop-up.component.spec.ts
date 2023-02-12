import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicesPopUpComponent } from './choices-pop-up.component';

describe('ChoicesPopUpComponent', () => {
  let component: ChoicesPopUpComponent;
  let fixture: ComponentFixture<ChoicesPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChoicesPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicesPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
