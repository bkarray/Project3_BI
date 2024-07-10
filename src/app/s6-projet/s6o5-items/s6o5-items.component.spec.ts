import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S6o5ItemsComponent } from './s6o5-items.component';

describe('S6o5ItemsComponent', () => {
  let component: S6o5ItemsComponent;
  let fixture: ComponentFixture<S6o5ItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S6o5ItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o5ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
