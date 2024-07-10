import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o8o2ButtonComponent } from './s8o1o8o2-button.component';

describe('S8o1o8o2ButtonComponent', () => {
  let component: S8o1o8o2ButtonComponent;
  let fixture: ComponentFixture<S8o1o8o2ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o8o2ButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o8o2ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
