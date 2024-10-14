import { TestBed } from '@angular/core/testing';

import { ServiceStatsConcessionService } from './service-stats-concession.service';

describe('ServiceStatsConcessionService', () => {
  let service: ServiceStatsConcessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceStatsConcessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
