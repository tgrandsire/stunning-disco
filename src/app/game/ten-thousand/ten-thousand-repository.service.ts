import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ApiVariable } from '../../api-variable';

import { Game } from '../model';

@Injectable()
export class TenThousandRepository {
	private readonly url: string = ApiVariable.BASE + '/games?name=Le%2010.000';

	constructor(private http: HttpClient) { }

	getList(): Observable<any> {
		return this.http
			.get(this.url)
			// .map((data: Response) => data.json())
			// .map((data: Observable<Game>) => data[ApiVariable.COLLECTION_MEMBER])
		;
	}

	count(): Observable<any> {
		return this.http
			.get(this.url)
			// .map((data: Response) => data.json())
			// .map((data: Observable<number>) => data[ApiVariable.COLLECTION_COUNT])
		;
	}
}
