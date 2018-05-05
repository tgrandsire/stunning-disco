import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';

import { ApiVariable } from '../api-variable';

@Injectable()
export class AuthenticationService {
	// token name must be the same as the tokenGetter function in app.module.ts
	private readonly tokenName        = 'access_token';
	private readonly refreshTokenName = 'refresh_token';

	private username: string;

	constructor(
		private http: HttpClient,
		private jwtHelper: JwtHelperService,
		private router: Router
	) { }

	/**
	 * Authenticate
	 *
	 * @param  {any} user
	 *
	 * @return {any}
	 */
	authenticate(user: any): any {
		let url: string = ApiVariable.BASE + '/login_check';
		let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

		return this.http
			.post(url, '_username=' + user.username + '&_password=' + user.password, {headers: headers})
			.map(response => {
				this.storeToken(response);
				this.username = user.username;
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
	 * Gets its refresh token
	 *
	 * @return {string}
	 */
	public getRefreshToken(): string {
		return localStorage.getItem(this.refreshTokenName);
	}

	/**
	 * Logouts the current user
	 *
	 * @return {void}
	 */
	logout(): void {
		localStorage.removeItem(this.tokenName);
		localStorage.removeItem(this.refreshTokenName);
		this.router.navigate(['/login']);
	}

	/**
	 * Returns whether the user is connected
	 *
	 * @return {boolean}
	 */
	isAuthenticated(): boolean {
		return !this.jwtHelper.isTokenExpired(this.getToken());
	}

	getRefreshTokenUrl() {
		return ApiVariable.BASE + '/token/refresh';
	}

	/**
	 * Refresh token
	 *
	 * @return {any}
	 */
	refreshToken() {
		let headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});

		return this.http
			.post(this.getRefreshTokenUrl(), this.refreshTokenName + '=' + localStorage.getItem(this.refreshTokenName), {headers: headers})
			.map(response => {
				this.storeToken(response);
			})
		;
	}

	/**
	 * Store token
	 *
	 * @param {any} response
	 */
	protected storeToken(response: any) {
		if (typeof response['token'] !== 'undefined') {
			localStorage.setItem(this.tokenName, response['token']);
		}

		if (typeof response[this.refreshTokenName] !== 'undefined') {
			localStorage.setItem(this.refreshTokenName, response[this.refreshTokenName]);
		}
	}
}
