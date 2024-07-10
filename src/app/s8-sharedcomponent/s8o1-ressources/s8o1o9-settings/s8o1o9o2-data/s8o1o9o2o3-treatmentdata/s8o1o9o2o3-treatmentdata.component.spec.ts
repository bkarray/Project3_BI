import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o9o2o3TreatmentdataComponent } from './s8o1o9o2o3-treatmentdata.component';

describe('S8o1o9o2o3TreatmentdataComponent', () => {
  let component: S8o1o9o2o3TreatmentdataComponent;
  let fixture: ComponentFixture<S8o1o9o2o3TreatmentdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o9o2o3TreatmentdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o9o2o3TreatmentdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
