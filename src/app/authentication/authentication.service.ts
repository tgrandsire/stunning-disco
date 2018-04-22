import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';

import { ApiVariable } from '../api-variable';

@Injectable()
export class AuthenticationService {
	// token name must be the same as the tokenGetter function in app.module.ts
	private readonly tokenName = 'access_token';

	private username: string;

	constructor(
		private http: HttpClient,
		private jwtHelper: JwtHelperService
	) { }

	authenticate(user: any): any {
		let url: string = ApiVariable.BASE + '/login_check';
		let body: Object = {
			'_username': user.username,
			'_password': user.password,
		};
		let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

		return this.http
			.post(url, '_username=' + user.username + '&_password=' + user.password, {headers: headers})
			.map(response => {
				if (typeof response['token'] !== 'undefined') {
					localStorage.setItem(this.tokenName, response['token']);
					this.username = user.username;
				}
			})
		;
	}

	/**
	 * Gets its token
	 *
	 * @return {string}
	 */
	public getToken(): string {
		return localStorage.getItem(this.tokenName);
	}

	/**
	 * Logouts the current user
	 *
	 * @return {void}
	 */
	logout(): void {
		localStorage.removeItem(this.tokenName);
	}

	/**
	 * Returns whether the user is connected
	 *
	 * @return {boolean}
	 */
	public isAuthenticated(): boolean {
		return !this.jwtHelper.isTokenExpired(this.getToken());
	}
}
