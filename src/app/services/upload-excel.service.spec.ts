import { TestBed } from '@angular/core/testing';

import { UploadExcelService } from './upload-excel.service';

describe('UploadExcelService', () => {
  let service: UploadExcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadExcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
