import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication/authentication.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(
  	private authenticationService: AuthenticationService,
  	private router: Router
  ) {}

  hasAuthToken(): boolean {
		return localStorage.getItem('access_token') !== null;
  }

  logout(): void {
		this.authenticationService.logout();
		this.router.navigate(['home']);
  }
}
