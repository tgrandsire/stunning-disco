import { Injectable } from '@angular/core';

import { ApiVariable } from '../../api-variable';

import { RepositoryService } from '../../shared/repositories/repository-service';
import { Thing } from '../../shared/model/thing';
import { Game } from '../model';

@Injectable()
export class GameRepository extends RepositoryService {
	protected readonly url: string = ApiVariable.BASE + '/games';

	protected transformResource(thing: Thing): Game {
		let game = this.thingify(thing);

		return Object.assign(new Game(), game);
	}
}
