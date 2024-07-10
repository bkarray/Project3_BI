import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o9o1o2PositionComponent } from './s8o1o9o1o2-position.component';

describe('S8o1o9o1o2PositionComponent', () => {
  let component: S8o1o9o1o2PositionComponent;
  let fixture: ComponentFixture<S8o1o9o1o2PositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o9o1o2PositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o9o1o2PositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
