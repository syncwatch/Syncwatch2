import { TestBed } from '@angular/core/testing';

import { OnlineGuardService } from './online-guard.service';

describe('OnlineGuardService', () => {
  let service: OnlineGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
