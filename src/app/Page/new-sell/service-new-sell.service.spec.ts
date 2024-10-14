import { TestBed } from '@angular/core/testing';

import { ServiceNewSellService } from './service-new-sell.service';

describe('ServiceNewSellService', () => {
  let service: ServiceNewSellService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceNewSellService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
