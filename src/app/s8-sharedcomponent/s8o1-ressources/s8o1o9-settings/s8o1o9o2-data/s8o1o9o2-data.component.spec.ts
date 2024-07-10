import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o9o2DataComponent } from './s8o1o9o2-data.component';

describe('S8o1o9o2DataComponent', () => {
  let component: S8o1o9o2DataComponent;
  let fixture: ComponentFixture<S8o1o9o2DataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o9o2DataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o9o2DataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
