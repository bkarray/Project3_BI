import { TestBed } from '@angular/core/testing';

import { S8o8o3SceCommunicationService } from './s8o8o3-sce-communication.service';

describe('S8o8o3SceCommunicationService', () => {
  let service: S8o8o3SceCommunicationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(S8o8o3SceCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
