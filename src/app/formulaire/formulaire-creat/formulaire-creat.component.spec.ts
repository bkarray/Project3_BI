import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireCreatComponent } from './formulaire-creat.component';

describe('FormulaireCreatComponent', () => {
  let component: FormulaireCreatComponent;
  let fixture: ComponentFixture<FormulaireCreatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireCreatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireCreatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
