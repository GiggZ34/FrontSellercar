import { TestBed } from '@angular/core/testing';

import { ServiceDisplaySellerService } from './service-display-seller.service';

describe('ServiceDisplaySellerService', () => {
  let service: ServiceDisplaySellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDisplaySellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
