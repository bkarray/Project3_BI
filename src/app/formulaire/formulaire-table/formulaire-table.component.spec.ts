import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireTableComponent } from './formulaire-table.component';

describe('FormulaireTableComponent', () => {
  let component: FormulaireTableComponent;
  let fixture: ComponentFixture<FormulaireTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormulaireTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormulaireTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
