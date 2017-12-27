import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication/authentication.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(private authenticationService: AuthenticationService, private router: Router) {}

    hasAuthToken() {
		return localStorage.getItem('id_token') !== null;
    }

    logout() {
		this.authenticationService.logout();
		this.router.navigate(['home']);
    }
}
