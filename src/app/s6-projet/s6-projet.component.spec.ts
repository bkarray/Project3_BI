import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S6ProjetComponent } from './s6-projet.component';

describe('S6ProjetComponent', () => {
  let component: S6ProjetComponent;
  let fixture: ComponentFixture<S6ProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S6ProjetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S6ProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
