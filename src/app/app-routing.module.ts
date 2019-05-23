import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { UserService } from './core/services';
import { HomeComponent } from './app-component/home';
import { LoginComponent } from './login';
import { FullComponent } from './navigation/full.component';

const appRoutes: Routes = [
    { path: 'service-web/login', component: LoginComponent},
    {
      path: '',
      component: FullComponent,
      children: [
        { path: 'service-web', component: HomeComponent },
        { path: 'service-web/home', component: HomeComponent },
        {
        path: 'service-web/business',
        loadChildren: './app-component/business/business.module#BusinessModule'
        },
        {
        path: 'service-web/subsidiary',
        loadChildren: './app-component/subsidiary/subsidiary.module#SubsidiaryModule'
        },
        {
        path: 'service-web/users',
        loadChildren: './app-component/users/users.module#UsersModule'
        },
        {
        path: 'service-web/people',
        loadChildren: './app-component/people/people.module#PeopleModule'
        },
        {
        path: 'service-web/role',
        loadChildren: './app-component/role/role.module#RoleModule'
        },
        {
        path: 'service-web/profile',
        loadChildren: './app-component/profile/profile.module#ProfileModule'
        },
        {
        path: 'service-web/reference-types',
        loadChildren: './app-component/reference-types/reference-types.module#ReferenceTypesModule'
        },
        {
        path: 'service-web/destinations-types',
        loadChildren: './app-component/destinations-types/destinations-types.module#DestinationsTypesModule'
        },
        {
        path: 'service-web/calculation-types',
        loadChildren: './app-component/calculation-types/calculation-types.module#CalculationTypesModule'
        },
        {
        path: 'service-web/outlays-types',
        loadChildren: './app-component/outlays-types/outlays-types.module#OutlaysTypesModule'
        },
        {
        path: 'service-web/egress-types',
        loadChildren: './app-component/egress-types/egress-types.module#EgressTypesModule'
        },
        {
        path: 'service-web/ingress-types',
        loadChildren: './app-component/ingress-types/ingress-types.module#IngressTypesModule'
        },
        {
        path: 'service-web/relations-types',
        loadChildren: './app-component/relations-types/relations-types.module#RelationsTypesModule'
        },
        {
        path: 'service-web/payments-types',
        loadChildren: './app-component/payments-types/payments-types.module#PaymentsTypesModule'
        },
      ]
    },
    //{ path: 'users', component: UsersComponent, outlet: 'home-content'},
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
