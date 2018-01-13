import { TestBed, inject } from '@angular/core/testing';

import { GameRepository } from './game-repository.service';

describe('GameRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameRepository]
    });
  });

  it('should be created', inject([GameRepository], (service: GameRepository) => {
    expect(service).toBeTruthy();
  }));
});
