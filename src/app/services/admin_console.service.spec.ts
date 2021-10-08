import { async, ComponentFixture,TestBed } from '@angular/core/testing';
import { AdminConsoleService } from './admin_console.service';

describe('AdminConsoleService', () => {
  let service: AdminConsoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminConsoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});