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
      data: {roles: ['users', 'addUser']}
    },
    { path: ':id', component: ViewUsersComponent
    },
    { path: ':id/edit', component: EditUsersComponent,
      data: {
        allowedRoles: ['users', 'editUser']
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
