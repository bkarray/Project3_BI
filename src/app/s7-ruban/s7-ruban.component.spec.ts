import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S7RubanComponent } from './s7-ruban.component';

describe('S7RubanComponent', () => {
  let component: S7RubanComponent;
  let fixture: ComponentFixture<S7RubanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S7RubanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S7RubanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
