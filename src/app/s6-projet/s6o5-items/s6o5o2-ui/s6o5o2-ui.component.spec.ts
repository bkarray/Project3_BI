import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S6o5o2UIComponent } from './s6o5o2-ui.component';

describe('S6o5o2UIComponent', () => {
  let component: S6o5o2UIComponent;
  let fixture: ComponentFixture<S6o5o2UIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S6o5o2UIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o5o2UIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
