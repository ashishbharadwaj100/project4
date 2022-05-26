import { TestBed } from '@angular/core/testing';

import { SerPro4Service } from './ser-pro4.service';

describe('SerPro4Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SerPro4Service = TestBed.get(SerPro4Service);
    expect(service).toBeTruthy();
  });
});
