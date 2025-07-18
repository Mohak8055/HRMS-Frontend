import { TestBed } from '@angular/core/testing';

import { LeaveServices } from './leave-services';

describe('LeaveServices', () => {
  let service: LeaveServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
