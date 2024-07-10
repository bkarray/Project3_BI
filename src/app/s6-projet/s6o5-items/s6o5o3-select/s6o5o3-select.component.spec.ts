import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S6o5o3SelectComponent } from './s6o5o3-select.component';

describe('S6o5o3SelectComponent', () => {
  let component: S6o5o3SelectComponent;
  let fixture: ComponentFixture<S6o5o3SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S6o5o3SelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o5o3SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
