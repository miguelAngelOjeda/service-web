import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { AddUsersComponent , EditUsersComponent, ListUsersComponent,
ViewUsersComponent } from '../users';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListUsersComponent,
      canActivate: [UserService],
      data: {roles: ['users', 'listUsers']}
    },
    { path: 'new', component: AddUsersComponent,
      canActivate: [UserService],
      data: {roles: ['users', 'addUsers']}
    },
    { path: ':id', component: ViewUsersComponent,
      canActivate: [UserService],
      data: {roles: ['users', 'viewUsers']}
    },
    { path: ':id/edit', component: EditUsersComponent,
      data: {
        allowedRoles: ['users', 'editUsers']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
