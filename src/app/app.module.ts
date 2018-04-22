import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

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

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

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
    MatIconModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    GameRepository
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
