import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { UsersComponent } from './users';
import { AuthGuard } from './guards';

const appRoutes: Routes = [
    { path: 'service-web', component: HomeComponent },
    { path: 'service-web/home', component: HomeComponent },
    { path: 'service-web/login', component: LoginComponent},
    { path: 'users', component: UsersComponent, outlet: 'home-content'},
    // otherwise redirect to home
    { path: '**', redirectTo: 'service-web' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    // preload all modules; optionally we could
    // implement a custom preloading strategy for just some
    // of the modules ( welcome 😉)
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
