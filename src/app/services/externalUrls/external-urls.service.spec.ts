import { TestBed } from '@angular/core/testing';

import { ExternalUrlsService } from './external-urls.service';

describe('ExternalUrlsService', () => {
  let service: ExternalUrlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalUrlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
