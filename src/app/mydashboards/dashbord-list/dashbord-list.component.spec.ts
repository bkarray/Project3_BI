import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordListComponent } from './dashbord-list.component';

describe('DashbordListComponent', () => {
  let component: DashbordListComponent;
  let fixture: ComponentFixture<DashbordListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashbordListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbordListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
