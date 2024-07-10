import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S6o5o5o2TableComponent } from './s6o5o5o2-table.component';

describe('S6o5o5o2TableComponent', () => {
  let component: S6o5o5o2TableComponent;
  let fixture: ComponentFixture<S6o5o5o2TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S6o5o5o2TableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o5o5o2TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
