import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o8o1o3RightclickComponent } from './s8o1o8o1o3-rightclick.component';

describe('S8o1o8o1o3RightclickComponent', () => {
  let component: S8o1o8o1o3RightclickComponent;
  let fixture: ComponentFixture<S8o1o8o1o3RightclickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o8o1o3RightclickComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o8o1o3RightclickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
