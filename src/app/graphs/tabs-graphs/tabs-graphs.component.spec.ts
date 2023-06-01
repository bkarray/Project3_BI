import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsGraphsComponent } from './tabs-graphs.component';

describe('TabsGraphsComponent', () => {
  let component: TabsGraphsComponent;
  let fixture: ComponentFixture<TabsGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabsGraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
