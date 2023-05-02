import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectReponseComponent } from './select-reponse.component';

describe('SelectReponseComponent', () => {
  let component: SelectReponseComponent;
  let fixture: ComponentFixture<SelectReponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectReponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectReponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
