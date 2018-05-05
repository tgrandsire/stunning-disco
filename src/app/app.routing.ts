import { Routes, RouterModule } from '@angular/router';

import { HomepageComponent } from './homepage/homepage.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { GamesComponent } from './games/games.component';
import { TenThousandComponent } from './games/ten-thousand/ten-thousand.component';
import { AuthGuard } from './_guard/index';

const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'login',
    component: AuthenticationComponent
  },
  {
    path: 'games',
    component: GamesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'games/10.000',
    component: TenThousandComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
