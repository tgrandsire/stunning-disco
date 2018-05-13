import { Injectable } from '@angular/core';

import { ApiVariable } from '../../api-variable';

import { RepositoryService } from '../../shared/repositories/repository-service';
import { Play, NamedPlayer } from '../model';

@Injectable()
export class NamedPlayerRepository extends RepositoryService {
  protected readonly url: string = ApiVariable.BASE + '/named_players';

  protected transformResource(resource: any): NamedPlayer {
  	return Object.assign(new NamedPlayer(), resource);
  }
}
