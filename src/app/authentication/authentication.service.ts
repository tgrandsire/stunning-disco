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
		let url: string = ApiVariable.BASE + '/login_check';
		let body: Object = {
			'_username': user.username,
			'_password': user.password,
		};
		let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

		this.http
			.post(url, '_username=' + user.username + '&_password=' + user.password, {headers: headers})
			.subscribe(response => {
				if (typeof response['token'] !== 'undefined') {
					localStorage.setItem('access_token', response['token']);
				}
			})
		;

		return true;
	}

	logout() {
		localStorage.removeItem('access_token');
	}

	loggedIn() {
		return !this.jwtHelper.isTokenExpired(localStorage.getItem('access_token'));
	}
}
