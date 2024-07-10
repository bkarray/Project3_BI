import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S6o5o5BDComponent } from './s6o5o5-bd.component';

describe('S6o5o5BDComponent', () => {
  let component: S6o5o5BDComponent;
  let fixture: ComponentFixture<S6o5o5BDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S6o5o5BDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o5o5BDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
