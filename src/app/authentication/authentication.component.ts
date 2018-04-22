import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
})
export class AuthenticationComponent {
  public loginForm: FormGroup;
  protected error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  submitLoginForm() {
    this.authenticationService.authenticate(this.loginForm.value).subscribe(r => {
      setTimeout(() => this.router.navigate(['game']));
    }, error => {
      this.error = 'Bad Credentials';
    });
  }


}
