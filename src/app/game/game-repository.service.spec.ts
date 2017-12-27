import { TestBed, inject } from '@angular/core/testing';

import { GameRepositoryService } from './game-repository.service';

describe('GameRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameRepositoryService]
    });
  });

  it('should be created', inject([GameRepositoryService], (service: GameRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
