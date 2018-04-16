import { Injectable } from '@angular/core';

import { ApiVariable } from '../api-variable';

import { RepositoryService } from '../shared/repositories/repository-service';
import { Game } from './model';

@Injectable()
export class GameRepository extends RepositoryService {
	protected readonly url: string = ApiVariable.BASE + '/games';
}
