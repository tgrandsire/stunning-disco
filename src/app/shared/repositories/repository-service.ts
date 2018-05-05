import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { ApiVariable } from '../../api-variable';

import { Thing } from '../model/thing';

@Injectable()
export class RepositoryService {
	protected readonly url: string;

	constructor(protected http: HttpClient) {}

	cget(): Observable<any[]> {
		return this.http.get(this.url)
			.map(response => {
				return response[ApiVariable.COLLECTION_MEMBER];
			})
			.map(response => {
				let objects = [];

				for (var object of response) {
					objects.push(this.transformResource(object));
				}

				return objects;
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
			.map(this.transformResource, this)
			.catch(error => this.handleError(error))
		;
	}

	post(data: any, url?: string): Observable<any> {
		var url = url || this.url;

		return this.http
			.post(url, data)
			.map(this.transformResource, this)
			.catch(error => this.handleError(error))
		;
	}

	protected handleError(error: any) {
		if (error instanceof Response) {
      return Observable.throw(error.json()['error'] || 'backend server error');
    }

		return Observable.throw(error || 'backend server error');
	}

	protected transformResource(resource: any) {
		return this.thingify(resource);
	}

	protected thingify(resource: any): Thing {
		let thing = new Thing();

		return Object.assign(thing, resource);
	}
}
