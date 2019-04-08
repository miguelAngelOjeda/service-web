import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { UserService } from './core/services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { ListEnterpriseComponent, EditEnterpriseComponent, ViewEnterpriseComponent, AddEnterpriseComponent } from './enterprise';
import { ActivateSubsidiaryComponent, AddSubsidiaryComponent , DeleteSubsidiaryComponent, EditSubsidiaryComponent, ListSubsidiaryComponent,
ViewSubsidiaryComponent } from './subsidiary';

const appRoutes: Routes = [
    { path: 'service-web', component: HomeComponent },
    { path: 'service-web/home', component: HomeComponent },
    { path: 'service-web/login', component: LoginComponent},
    { path: 'service-web/enterprise',
      children: [
		  { path: '', component: ListEnterpriseComponent,
        canActivate: [UserService],
        data: {roles: ['enterprise', 'listEnterprise']}
      },
      { path: 'new', component: AddEnterpriseComponent,
        canActivate: [UserService],
        data: {roles: ['enterprise', 'addEnterprise']}
      },
      { path: ':id', component: ViewEnterpriseComponent,
        canActivate: [UserService],
        data: {roles: ['enterprise', 'viewEnterprise']}
      },
    	{ path: ':id/edit', component: EditEnterpriseComponent,
        data: {
          allowedRoles: ['enterprise', 'editEnterprise']
        }
      }
                ]
    },
    // { path: 'service-web/subsidiary',
    //   children: [
		//   { path: '', component: ListSubsidiaryComponent,
    //     canActivate: [UserService],
    //     data: {roles: ['subsidiary', 'listSubsidiary']}
    //   },
    //   { path: 'new', component: AddSubsidiaryComponent,
    //     canActivate: [UserService],
    //     data: {roles: ['subsidiary', 'addSubsidiary']}
    //   },
    //   { path: ':id', component: ViewSubsidiaryComponent,
    //     canActivate: [UserService],
    //     data: {roles: ['subsidiary', 'viewSubsidiary']}
    //   },
    // 	{ path: ':id/edit', component: EditSubsidiaryComponent,
    //     data: {
    //       allowedRoles: ['subsidiary', 'editSubsidiary']
    //     }
    //   }
    //             ]
    // },
    {
    path: 'service-web/subsidiary',
    loadChildren: './subsidiary/subsidiary.module#SubsidiaryModule'
    },
    {
    path: 'service-web/reference-types',
    loadChildren: './reference-types/reference-types.module#ReferenceTypesModule'
    },
    {
    path: 'service-web/destinations-types',
    loadChildren: './destinations-types/destinations-types.module#DestinationsTypesModule'
    },
    {
    path: 'service-web/calculation-types',
    loadChildren: './calculation-types/calculation-types.module#CalculationTypesModule'
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
