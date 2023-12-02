import { TestBed } from '@angular/core/testing';

import { SportGuard } from './sport.guard';

describe('SportGuard', () => {
  let guard: SportGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SportGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
