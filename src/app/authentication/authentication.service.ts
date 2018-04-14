import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
// import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

import { ApiVariable } from '../api-variable';


@Injectable()
export class AuthenticationService {

	constructor(
		private http: HttpClient,
		public jwtHelper: JwtHelperService
	) { }

	authenticate(user: any) {
		let url = ApiVariable.BASE + '/login_check';
		// let body    = new URLSearchParams();
		// body.append('_username', user.username);
		// body.append('_password', user.password);
		let body = {
			'_username': user.username,
			'_password': user.password,
		};
		let headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
		// let options = new RequestOptions({headers: headers});

		return this.http
			// .post(url, body.toString(), options)
			.post(url, '_username=' + user.username + '&_password=' + user.password, {headers: headers})
			// .map((response: Observable<any>) => response)
		;
	}

	logout() {
		localStorage.removeItem('id_token');
	}

	loggedIn() {
		// return tokenNotExpired('id_token');
		return ! this.jwtHelper.isTokenExpired();
	}
}
