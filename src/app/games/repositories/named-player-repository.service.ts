import { Injectable } from '@angular/core';

import { ApiVariable } from '../../api-variable';

import { RepositoryService } from '../../shared/repositories/repository-service';
import { Play } from '../model';

@Injectable()
export class NamedPlayerRepository extends RepositoryService {
  protected readonly url: string = ApiVariable.BASE + '/named_players';
}
