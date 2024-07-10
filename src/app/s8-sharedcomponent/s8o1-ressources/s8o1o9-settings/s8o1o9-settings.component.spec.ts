import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o1o9SettingsComponent } from './s8o1o9-settings.component';

describe('S8o1o9SettingsComponent', () => {
  let component: S8o1o9SettingsComponent;
  let fixture: ComponentFixture<S8o1o9SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o1o9SettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o1o9SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
