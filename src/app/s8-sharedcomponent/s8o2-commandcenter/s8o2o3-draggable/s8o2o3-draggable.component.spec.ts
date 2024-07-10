import { ComponentFixture, TestBed } from '@angular/core/testing';

import { S8o2o3DraggableComponent } from './s8o2o3-draggable.component';

describe('S8o2o3DraggableComponent', () => {
  let component: S8o2o3DraggableComponent;
  let fixture: ComponentFixture<S8o2o3DraggableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ S8o2o3DraggableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(S8o2o3DraggableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
