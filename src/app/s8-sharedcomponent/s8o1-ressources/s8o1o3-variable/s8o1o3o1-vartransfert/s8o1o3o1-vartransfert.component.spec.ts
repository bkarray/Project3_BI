import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o3o1VartransfertComponent } from './s8o1o3o1-vartransfert.component';

describe('S8o1o3o1VartransfertComponent', () => {
  let component: S8o1o3o1VartransfertComponent;
  let fixture: ComponentFixture<S8o1o3o1VartransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o3o1VartransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o3o1VartransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
