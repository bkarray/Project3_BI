import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S6o1RubanComponent } from './s6o1-ruban.component';

describe('S6o1RubanComponent', () => {
  let component: S6o1RubanComponent;
  let fixture: ComponentFixture<S6o1RubanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S6o1RubanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o1RubanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
