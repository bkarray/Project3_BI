import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o2CommandcenterComponent } from './s8o2-commandcenter.component';

describe('S8o2CommandcenterComponent', () => {
  let component: S8o2CommandcenterComponent;
  let fixture: ComponentFixture<S8o2CommandcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o2CommandcenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o2CommandcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
