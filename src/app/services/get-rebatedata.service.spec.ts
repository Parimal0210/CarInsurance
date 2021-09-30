import { TestBed } from '@angular/core/testing';

import { GetRebatedataService } from './get-rebatedata.service';

describe('GetRebatedataService', () => {
  let service: GetRebatedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRebatedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
