import { Injectable } from '@angular/core';

import { ApiVariable } from '../../api-variable';

import { RepositoryService } from '../../shared/repositories/repository-service';
import { ScoredTurn } from '../model';

@Injectable()
export class ScoredTurnRepository extends RepositoryService {
  protected readonly url: string = ApiVariable.BASE + '/scored_turns';

  protected transformResource(resource: any): ScoredTurn {
  	return Object.assign(new ScoredTurn(), resource);
  }
}
