import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o3VartransfertComponent } from './s8o1o3-vartransfert.component';

describe('S8o1o3VartransfertComponent', () => {
  let component: S8o1o3VartransfertComponent;
  let fixture: ComponentFixture<S8o1o3VartransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o3VartransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o3VartransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
