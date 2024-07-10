import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o8o3PopupComponent } from './s8o1o8o3-popup.component';

describe('S8o1o8o3PopupComponent', () => {
  let component: S8o1o8o3PopupComponent;
  let fixture: ComponentFixture<S8o1o8o3PopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o8o3PopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o8o3PopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
