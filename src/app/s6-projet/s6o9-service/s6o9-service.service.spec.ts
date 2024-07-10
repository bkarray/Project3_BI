import { TestBed } from '@angular/core/testing';

import { S6o9ServiceService } from './s6o9-service.service';

describe('S6o9ServiceService', () => {
  let service: S6o9ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(S6o9ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
