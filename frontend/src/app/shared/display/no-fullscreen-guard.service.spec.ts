import { TestBed } from '@angular/core/testing';

import { NoFullscreenGuardService } from './no-fullscreen-guard.service';

describe('NoFullscreenGuardService', () => {
  let service: NoFullscreenGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoFullscreenGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
