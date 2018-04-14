import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent {
  protected loginForm: FormGroup;
  protected error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  onSubmit() {
    this.authenticationService
      .authenticate(this.loginForm.value)
      .subscribe(response => {
        if (typeof response['token'] != 'undefined') {
          localStorage.setItem('id_token', response['token']);
          this.router.navigate(['game']);
        }
      }, error => {
        this.error = error.message
      })
    ;
  }
}
