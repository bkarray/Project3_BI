import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o1CmdcenterComponent } from './s8o1o1-cmdcenter.component';

describe('S8o1o1CmdcenterComponent', () => {
  let component: S8o1o1CmdcenterComponent;
  let fixture: ComponentFixture<S8o1o1CmdcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o1CmdcenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o1CmdcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
