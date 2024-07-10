import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S6o3PageurlComponent } from './s6o3-pageurl.component';

describe('S6o3PageurlComponent', () => {
  let component: S6o3PageurlComponent;
  let fixture: ComponentFixture<S6o3PageurlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S6o3PageurlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o3PageurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
