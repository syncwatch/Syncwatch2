import { TestBed } from '@angular/core/testing';

import { FullscreenGuardService } from './fullscreen-guard.service';

describe('FullscreenGuardService', () => {
  let service: FullscreenGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FullscreenGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
