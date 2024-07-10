import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S6o4SettingsComponent } from './s6o4-settings.component';

describe('S6o4SettingsComponent', () => {
  let component: S6o4SettingsComponent;
  let fixture: ComponentFixture<S6o4SettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S6o4SettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S6o4SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
