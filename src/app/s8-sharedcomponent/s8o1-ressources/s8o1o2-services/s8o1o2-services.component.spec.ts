import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o2ServicesComponent } from './s8o1o2-services.component';

describe('S8o1o2ServicesComponent', () => {
  let component: S8o1o2ServicesComponent;
  let fixture: ComponentFixture<S8o1o2ServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o2ServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o2ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
