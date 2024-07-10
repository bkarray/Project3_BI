import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o8o1ObjecttoolsComponent } from './s8o1o8o1-objecttools.component';

describe('S8o1o8o1ObjecttoolsComponent', () => {
  let component: S8o1o8o1ObjecttoolsComponent;
  let fixture: ComponentFixture<S8o1o8o1ObjecttoolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o8o1ObjecttoolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o8o1ObjecttoolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
