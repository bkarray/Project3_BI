import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserNotifactionsComponent } from './user-notifactions.component';

describe('UserNotifactionsComponent', () => {
  let component: UserNotifactionsComponent;
  let fixture: ComponentFixture<UserNotifactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserNotifactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserNotifactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
