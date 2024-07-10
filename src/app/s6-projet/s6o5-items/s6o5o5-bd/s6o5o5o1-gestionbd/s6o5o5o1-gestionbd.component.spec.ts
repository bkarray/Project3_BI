import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S6o5o5o1GestionbdComponent } from './s6o5o5o1-gestionbd.component';

describe('S6o5o5o1GestionbdComponent', () => {
  let component: S6o5o5o1GestionbdComponent;
  let fixture: ComponentFixture<S6o5o5o1GestionbdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S6o5o5o1GestionbdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o5o5o1GestionbdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
