import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o9o1ObjectComponent } from './s8o1o9o1-object.component';

describe('S8o1o9o1ObjectComponent', () => {
  let component: S8o1o9o1ObjectComponent;
  let fixture: ComponentFixture<S8o1o9o1ObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o9o1ObjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o9o1ObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
