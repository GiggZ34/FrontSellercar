import { TestBed } from '@angular/core/testing';

import { ServiceNewCustomersService } from './service-new-customers.service';

describe('ServiceNewCustomersService', () => {
  let service: ServiceNewCustomersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceNewCustomersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
