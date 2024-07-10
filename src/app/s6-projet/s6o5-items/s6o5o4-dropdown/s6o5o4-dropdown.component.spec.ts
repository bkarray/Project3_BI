import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S6o5o4DropdownComponent } from './s6o5o4-dropdown.component';

describe('S6o5o4DropdownComponent', () => {
  let component: S6o5o4DropdownComponent;
  let fixture: ComponentFixture<S6o5o4DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S6o5o4DropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o5o4DropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
