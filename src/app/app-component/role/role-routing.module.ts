import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { AddRoleComponent , EditRoleComponent, ListRoleComponent,
ViewRoleComponent } from '../role';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListRoleComponent,
      canActivate: [UserService],
      data: {roles: ['role', 'listRole']}
    },
    { path: 'new', component: AddRoleComponent,
      canActivate: [UserService],
      data: {roles: ['role', 'addRole']}
    },
    { path: ':id', component: ViewRoleComponent,
      canActivate: [UserService],
      data: {roles: ['role', 'viewRole']}
    },
    { path: ':id/edit', component: EditRoleComponent,
      data: {
        allowedRoles: ['role', 'editRole']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule {}
