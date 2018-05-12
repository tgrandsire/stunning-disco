import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { Routing } from './app.routing';
import { AuthGuard } from './_guard/index';

import { AuthenticationComponent } from './authentication/authentication.component';
import { AuthenticationService } from './authentication/authentication.service';
import { RefreshTokenInterceptor } from './authentication/refresh-token.interceptor';
import { HomepageComponent } from './homepage/homepage.component';
import { GamesComponent } from './games/games.component';
import { TenThousandComponent } from './games/ten-thousand/ten-thousand.component';

import { RepositoryService } from './shared/repositories/repository-service';
import { GameRepository } from './games/repositories/game-repository.service';
import { PlayRepository } from './games/repositories/play-repository.service';
import { NamedPlayerRepository } from './games/repositories/named-player-repository.service';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    HomepageComponent,
    GamesComponent,
    TenThousandComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    Routing,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['grandsire.local'],
        blacklistedRoutes: ['grandsire.local/auth']
      }
    }),
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    GameRepository,
    PlayRepository,
    NamedPlayerRepository,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
