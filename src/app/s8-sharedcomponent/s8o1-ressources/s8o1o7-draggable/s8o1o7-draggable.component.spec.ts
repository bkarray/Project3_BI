import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o7DraggableComponent } from './s8o1o7-draggable.component';

describe('S8o1o7DraggableComponent', () => {
  let component: S8o1o7DraggableComponent;
  let fixture: ComponentFixture<S8o1o7DraggableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o7DraggableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o7DraggableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
