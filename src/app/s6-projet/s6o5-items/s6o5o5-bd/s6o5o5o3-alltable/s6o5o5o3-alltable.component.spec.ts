import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S6o5o5o3AlltableComponent } from './s6o5o5o3-alltable.component';

describe('S6o5o5o3AlltableComponent', () => {
  let component: S6o5o5o3AlltableComponent;
  let fixture: ComponentFixture<S6o5o5o3AlltableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S6o5o5o3AlltableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o5o5o3AlltableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
