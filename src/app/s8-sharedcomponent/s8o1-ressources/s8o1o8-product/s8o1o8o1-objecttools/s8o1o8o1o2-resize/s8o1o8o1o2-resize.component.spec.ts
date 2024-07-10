import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o8o1o2ResizeComponent } from './s8o1o8o1o2-resize.component';

describe('S8o1o8o1o2ResizeComponent', () => {
  let component: S8o1o8o1o2ResizeComponent;
  let fixture: ComponentFixture<S8o1o8o1o2ResizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o8o1o2ResizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o8o1o2ResizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
