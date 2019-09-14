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
        path: 'service-web/functionary',
        loadChildren: './app-component/rrhh/functionary/functionary.module#FunctionaryModule'
        },
        {
        path: 'service-web/client',
        loadChildren: './app-component/client/client.module#ClientModule'
        },
        {
        path: 'service-web/credits',
        loadChildren: './app-component/solicitude/credits/credits.module#CreditsModule'
        },
        {
        path: 'service-web/review',
        loadChildren: './app-component/solicitude/review/review.module#ReviewModule'
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
        loadChildren: './app-component/types/reference-types/reference-types.module#ReferenceTypesModule'
        },
        {
        path: 'service-web/destinations-types',
        loadChildren: './app-component/types/destinations-types/destinations-types.module#DestinationsTypesModule'
        },
        {
        path: 'service-web/calculation-types',
        loadChildren: './app-component/types/calculation-types/calculation-types.module#CalculationTypesModule'
        },
        {
        path: 'service-web/outlays-types',
        loadChildren: './app-component/types/outlays-types/outlays-types.module#OutlaysTypesModule'
        },
        {
        path: 'service-web/study-types',
        loadChildren: './app-component/types/study-types/study-types.module#StudyTypesModule'
        },
        {
        path: 'service-web/functionary-types',
        loadChildren: './app-component/types/functionary-types/functionary-types.module#FunctionaryTypesModule'
        },
        {
        path: 'service-web/egress-types',
        loadChildren: './app-component/types/egress-types/egress-types.module#EgressTypesModule'
        },
        {
        path: 'service-web/ingress-types',
        loadChildren: './app-component/types/ingress-types/ingress-types.module#IngressTypesModule'
        },
        {
        path: 'service-web/relations-types',
        loadChildren: './app-component/types/relations-types/relations-types.module#RelationsTypesModule'
        },
        {
        path: 'service-web/payments-types',
        loadChildren: './app-component/types/payments-types/payments-types.module#PaymentsTypesModule'
        },
        {
        path: 'service-web/modality',
        loadChildren: './app-component/types/modality-types/modality-types.module#ModalityTypesModule'
        },
        {
        path: 'service-web/guarantee-types',
        loadChildren: './app-component/types/guarantee-types/guarantee-types.module#GuaranteeTypesModule'
        },
        {
        path: 'service-web/position-types',
        loadChildren: './app-component/types/position-types/position-types.module#PositionTypesModule'
        },
        {
        path: 'service-web/document-types',
        loadChildren: './app-component/types/document-types/document-types.module#DocumentTypesModule'
        },
        {
        path: 'service-web/capital-period',
        loadChildren: './app-component/types/capital-period/capital-period.module#CapitalPeriodModule'
        }
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
