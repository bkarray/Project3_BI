import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o2o2GestiondataComponent } from './s8o2o2-gestiondata.component';

describe('S8o2o2GestiondataComponent', () => {
  let component: S8o2o2GestiondataComponent;
  let fixture: ComponentFixture<S8o2o2GestiondataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o2o2GestiondataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o2o2GestiondataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
