import { TestBed } from '@angular/core/testing';

import { S8o8o1RessourcesService } from './s8o8o1-ressources.service';

describe('S8o8o1RessourcesService', () => {
  let service: S8o8o1RessourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(S8o8o1RessourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
