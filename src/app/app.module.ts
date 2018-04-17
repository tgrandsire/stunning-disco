import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { Routing } from './app.routing';
import { AuthGuard } from './_guard/index';

import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication/authentication.service';
import { RepositoryService } from './shared/repositories/repository-service';
import { HomepageComponent } from './homepage/homepage.component';
import { GameComponent } from './game/game.component';
import { GameRepository } from './game/game-repository.service';
import { TenThousandComponent } from './game/ten-thousand/ten-thousand.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomepageComponent,
    GameComponent,
    TenThousandComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    Routing,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['grandsire.local'],
        blacklistedRoutes: ['grandsire.local/auth']
      }
    }),
    MatToolbarModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    GameRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
