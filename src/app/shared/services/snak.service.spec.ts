import { TestBed } from '@angular/core/testing';

import { SnakService } from './snak.service';

describe('SnakService', () => {
  let service: SnakService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnakService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
