import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1RessourcesComponent } from './s8o1-ressources.component';

describe('S8o1RessourcesComponent', () => {
  let component: S8o1RessourcesComponent;
  let fixture: ComponentFixture<S8o1RessourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1RessourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1RessourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
