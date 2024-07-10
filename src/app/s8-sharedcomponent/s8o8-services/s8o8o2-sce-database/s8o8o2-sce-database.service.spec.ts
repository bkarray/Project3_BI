import { TestBed } from '@angular/core/testing';

import { S8o8o2SceDatabaseService } from './s8o8o2-sce-database.service';

describe('S8o8o2SceDatabaseService', () => {
  let service: S8o8o2SceDatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(S8o8o2SceDatabaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
