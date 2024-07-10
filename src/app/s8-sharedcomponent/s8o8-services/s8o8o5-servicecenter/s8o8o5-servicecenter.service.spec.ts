import { TestBed } from '@angular/core/testing';

import { S8o8o5ServicecenterService } from './s8o8o5-servicecenter.service';

describe('S8o8o5ServicecenterService', () => {
  let service: S8o8o5ServicecenterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(S8o8o5ServicecenterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
