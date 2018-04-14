import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { AuthHttp } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import { ApiVariable } from '../api-variable';

import { Game } from './model';

@Injectable()
export class GameRepository {
	url: string = ApiVariable.BASE + '/games';

	constructor(private http: HttpClient) {}

	getList(): Observable<Game[]> {
		let games = new Observable<Game[]>();
		this.http
			.get(this.url)
			.subscribe(response => {
				games = response[ApiVariable.COLLECTION_MEMBER];
			})
			// .map((response: Response) => response.json())
			// .map((response: Observable<Game>) => response[ApiVariable.COLLECTION_MEMBER])
			// .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
		;

		return games;
	}

	count(): Observable<any> {
		return this.http
			.get(this.url)
			// .map((response: Response) => response.json())
			// .map((response: Observable<number>) => response[ApiVariable.COLLECTION_COUNT])
		;
	}
}
