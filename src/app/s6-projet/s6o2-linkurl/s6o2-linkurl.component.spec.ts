import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S6o2LinkurlComponent } from './s6o2-linkurl.component';

describe('S6o2LinkurlComponent', () => {
  let component: S6o2LinkurlComponent;
  let fixture: ComponentFixture<S6o2LinkurlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S6o2LinkurlComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o2LinkurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
