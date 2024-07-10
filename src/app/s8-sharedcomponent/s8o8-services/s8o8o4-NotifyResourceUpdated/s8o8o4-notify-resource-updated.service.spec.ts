import { TestBed } from '@angular/core/testing';

import { S8o8o4NotifyResourceUpdatedService } from './s8o8o4-notify-resource-updated.service';

describe('S8o8o4NotifyResourceUpdatedService', () => {
  let service: S8o8o4NotifyResourceUpdatedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(S8o8o4NotifyResourceUpdatedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
