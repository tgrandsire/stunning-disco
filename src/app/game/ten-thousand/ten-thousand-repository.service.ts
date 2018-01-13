import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { ApiVariable } from '../../api-variable';

import { Game } from '../model';

@Injectable()
export class TenThousandRepository {
	url: string = ApiVariable.BASE + '/games?name=Le%2010.000';

	constructor(private authHttp: AuthHttp) {
	}

	getList() {

		return this.authHttp
			.get(this.url)
			.map((data: Response) => data.json())
			.map((data: Observable<Game>) => data[ApiVariable.COLLECTION_MEMBER]);
	}

	count() {
		return this.authHttp
			.get(this.url)
			.map((data: Response) => data.json())
			.map((data: Observable<number>) => data[ApiVariable.COLLECTION_COUNT]);
	}
}
