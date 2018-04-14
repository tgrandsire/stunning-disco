import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// import { Http, HttpModule, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { Routing } from './app.routing';
import { AuthGuard } from './_guard/index';

import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication/authentication.service';
import { HomepageComponent } from './homepage/homepage.component';
import { GameComponent } from './game/game.component';
import { GameRepository } from './game/game-repository.service';
import { TenThousandComponent } from './game/ten-thousand/ten-thousand.component';

// export function authHttpServiceFactory(http: Http, options: RequestOptions) {
//   return new AuthHttp( new AuthConfig({
//     tokenName: 'token',
//     tokenGetter: (() => localStorage.getItem('id_token')),
//     globalHeaders: [{'Content-Type':'application/json'}],
//   }), http, options);
// }

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomepageComponent,
    GameComponent,
    TenThousandComponent
   ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    // HttpModule,
    Routing,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200'],
        blacklistedRoutes: ['localhost:4200/auth/']
      }
    })
  ],
  providers: [
    // {
    //   provide: AuthHttp,
    //   useFactory: authHttpServiceFactory,
    //   deps: [ Http, RequestOptions ]
    // },
    AuthGuard,
    AuthenticationService,
    GameRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
