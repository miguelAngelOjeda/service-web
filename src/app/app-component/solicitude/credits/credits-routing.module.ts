import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddCreditsComponent , EditCreditsComponent, ListCreditsComponent,
ViewCreditsComponent } from '../credits';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListCreditsComponent,
       canActivate: [UserService],
       data: {roles: ['enterprise', 'listEnterprise']}
    },
    { path: 'new', component: AddCreditsComponent,
      canActivate: [UserService],
      data: {roles: ['enterprise', 'addEnterprise']}
    },
    { path: ':id', component: ViewCreditsComponent,
      canActivate: [UserService],
      data: {roles: ['enterprise', 'viewEnterprise']}
    },
    { path: ':id/edit', component: EditCreditsComponent,
      data: {
        allowedRoles: ['enterprise', 'editEnterprise']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditsRoutingModule {}
