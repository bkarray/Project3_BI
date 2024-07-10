import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o8DatabaseComponent } from './s8o1o8-database.component';

describe('S8o1o8DatabaseComponent', () => {
  let component: S8o1o8DatabaseComponent;
  let fixture: ComponentFixture<S8o1o8DatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o8DatabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o8DatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
