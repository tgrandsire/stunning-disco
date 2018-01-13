import { TestBed, inject } from '@angular/core/testing';

import { TenThousandRepository } from './ten-thousand-repository.service';

describe('TenThousandRepository', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TenThousandRepository]
    });
  });

  it('should be created', inject([TenThousandRepository], (service: TenThousandRepository) => {
    expect(service).toBeTruthy();
  }));
});
