import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o4FonctionComponent } from './s8o1o4-fonction.component';

describe('S8o1o4FonctionComponent', () => {
  let component: S8o1o4FonctionComponent;
  let fixture: ComponentFixture<S8o1o4FonctionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o4FonctionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o4FonctionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
