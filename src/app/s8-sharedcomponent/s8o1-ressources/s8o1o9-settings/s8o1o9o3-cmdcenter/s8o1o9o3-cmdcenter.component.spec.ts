import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o9o3CmdcenterComponent } from './s8o1o9o3-cmdcenter.component';

describe('S8o1o9o3CmdcenterComponent', () => {
  let component: S8o1o9o3CmdcenterComponent;
  let fixture: ComponentFixture<S8o1o9o3CmdcenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o9o3CmdcenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o9o3CmdcenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
