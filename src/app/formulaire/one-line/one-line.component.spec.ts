import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneLineComponent } from './one-line.component';

describe('OneLineComponent', () => {
  let component: OneLineComponent;
  let fixture: ComponentFixture<OneLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
