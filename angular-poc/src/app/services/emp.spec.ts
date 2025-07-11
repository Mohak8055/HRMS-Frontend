import { TestBed } from '@angular/core/testing';

import { Emp } from './emp';

describe('Emp', () => {
  let service: Emp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Emp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
