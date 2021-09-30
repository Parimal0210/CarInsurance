import { TestBed } from '@angular/core/testing';

import { CustomerAndOtpService } from './customer-and-otp.service';

describe('CustomerAndOtpService', () => {
  let service: CustomerAndOtpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerAndOtpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
