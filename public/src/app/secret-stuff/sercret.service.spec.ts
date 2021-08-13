import { TestBed } from '@angular/core/testing';

import { SercretService } from './sercret.service';

describe('SercretService', () => {
  let service: SercretService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SercretService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
