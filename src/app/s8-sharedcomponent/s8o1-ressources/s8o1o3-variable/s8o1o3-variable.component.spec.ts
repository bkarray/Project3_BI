import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o3VariableComponent } from './s8o1o3-variable.component';

describe('S8o1o3VariableComponent', () => {
  let component: S8o1o3VariableComponent;
  let fixture: ComponentFixture<S8o1o3VariableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o3VariableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o3VariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
