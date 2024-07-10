import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o8ProductComponent } from './s8o1o8-product.component';

describe('S8o1o8ProductComponent', () => {
  let component: S8o1o8ProductComponent;
  let fixture: ComponentFixture<S8o1o8ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o8ProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o8ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
