import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestFormsComponent } from './rest-forms.component';

describe('RestFormsComponent', () => {
  let component: RestFormsComponent;
  let fixture: ComponentFixture<RestFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
