import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { AddBusinessComponent , EditBusinessComponent, ListBusinessComponent,
ViewBusinessComponent } from '../business';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListBusinessComponent,
       canActivate: [UserService],
       data: {roles: ['enterprise', 'listEnterprise']}
    },
    { path: 'new', component: AddBusinessComponent,
      canActivate: [UserService],
      data: {roles: ['enterprise', 'addEnterprise']}
    },
    { path: ':id', component: ViewBusinessComponent,
      canActivate: [UserService],
      data: {roles: ['enterprise', 'viewEnterprise']}
    },
    { path: ':id/edit', component: EditBusinessComponent,
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
export class BusinessRoutingModule {}
