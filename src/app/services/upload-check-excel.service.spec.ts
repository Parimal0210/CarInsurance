import { TestBed } from '@angular/core/testing';

import { UploadCheckExcelService } from './upload-check-excel.service';

describe('UploadCheckExcelService', () => {
  let service: UploadCheckExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadCheckExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
