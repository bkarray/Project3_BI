import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o9o2o1InputdataComponent } from './s8o1o9o2o1-inputdata.component';

describe('S8o1o9o2o1InputdataComponent', () => {
  let component: S8o1o9o2o1InputdataComponent;
  let fixture: ComponentFixture<S8o1o9o2o1InputdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o9o2o1InputdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o9o2o1InputdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
