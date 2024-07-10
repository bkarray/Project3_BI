import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o1o1CmdcenterdetailComponent } from './s8o1o1o1-cmdcenterdetail.component';

describe('S8o1o1o1CmdcenterdetailComponent', () => {
  let component: S8o1o1o1CmdcenterdetailComponent;
  let fixture: ComponentFixture<S8o1o1o1CmdcenterdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o1o1CmdcenterdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o1o1CmdcenterdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
