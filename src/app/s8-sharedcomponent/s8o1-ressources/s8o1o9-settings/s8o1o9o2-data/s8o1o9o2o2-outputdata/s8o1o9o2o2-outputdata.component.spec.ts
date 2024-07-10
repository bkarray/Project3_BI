import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o9o2o2OutputdataComponent } from './s8o1o9o2o2-outputdata.component';

describe('S8o1o9o2o2OutputdataComponent', () => {
  let component: S8o1o9o2o2OutputdataComponent;
  let fixture: ComponentFixture<S8o1o9o2o2OutputdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o9o2o2OutputdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o9o2o2OutputdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
