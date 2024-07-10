import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S6o5o5o4CategoryComponent } from './s6o5o5o4-category.component';

describe('S6o5o5o4CategoryComponent', () => {
  let component: S6o5o5o4CategoryComponent;
  let fixture: ComponentFixture<S6o5o5o4CategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S6o5o5o4CategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o5o5o4CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
