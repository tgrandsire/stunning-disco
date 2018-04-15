import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { AuthHttp } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiVariable } from '../api-variable';

import { RepositoryService } from '../shared/repositories/repository-service';
import { Game } from './model';

@Injectable()
export class GameRepository extends RepositoryService {
	protected readonly url: string = ApiVariable.BASE + '/games';
}
