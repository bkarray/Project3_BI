import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o3o2VarlocaltsComponent } from './s8o1o3o2-varlocalts.component';

describe('S8o1o3o2VarlocaltsComponent', () => {
  let component: S8o1o3o2VarlocaltsComponent;
  let fixture: ComponentFixture<S8o1o3o2VarlocaltsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o3o2VarlocaltsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o3o2VarlocaltsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
