import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { AuthHttp } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiVariable } from '../../api-variable';

@Injectable()
export class RepositoryService {
	protected readonly url: string;

	constructor(private http: HttpClient) {}

	cget(): Observable<any[]> {
		return this.http.get(this.url)
			.map(response => {
				return response[ApiVariable.COLLECTION_MEMBER];
			})
			.catch(error => this.handleError(error))
		;
	}

	count(): Observable<number> {
		return this.http
			.get(this.url)
			.map(response => {
				return response[ApiVariable.COLLECTION_COUNT];
			})
			.catch(error => this.handleError(error))
		;
	}

	get(id): Observable<any> {
		return this.http
			.get(this.url + '/' + id)
			.map(response => {
				return response;
			})
			.catch(error => this.handleError(error))
		;
	}

	protected handleError(error: any) {
		if (error instanceof Response) {
      return Observable.throw(error.json()['error'] || 'backend server error');
    }

		return Observable.throw(error || 'backend server error');
	}
}
