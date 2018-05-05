import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { AuthenticationService } from './authentication.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticationService.getRefreshToken() &&
    		this.authenticationService.getToken() &&
    		! this.authenticationService.isAuthenticated &&
    		request.url !== this.authenticationService.getRefreshTokenUrl()
    ) {
      this.authenticationService.refreshToken().subscribe();
    }

    return next.handle(request);
  }
}
