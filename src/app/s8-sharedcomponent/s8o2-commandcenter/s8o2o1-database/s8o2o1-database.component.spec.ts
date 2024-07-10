import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o2o1DatabaseComponent } from './s8o2o1-database.component';

describe('S8o2o1DatabaseComponent', () => {
  let component: S8o2o1DatabaseComponent;
  let fixture: ComponentFixture<S8o2o1DatabaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o2o1DatabaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o2o1DatabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
