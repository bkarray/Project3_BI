import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireReponseComponent } from './formulaire-reponse.component';

describe('FormulaireReponseComponent', () => {
  let component: FormulaireReponseComponent;
  let fixture: ComponentFixture<FormulaireReponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireReponseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireReponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
