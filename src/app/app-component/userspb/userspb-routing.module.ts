import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { AddUserspbComponent , EditUserspbComponent, ListUserspbComponent,
ViewUserspbComponent } from '../userspb';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListUserspbComponent,
      canActivate: [UserService],
      data: {roles: ['users', 'listUsers']}
    },
    { path: 'new', component: AddUserspbComponent,
      canActivate: [UserService],
      data: {roles: ['users', 'addUsers']}
    },
    { path: ':id', component: ViewUserspbComponent,
      canActivate: [UserService],
      data: {roles: ['users', 'viewUsers']}
    },
    { path: ':id/edit', component: EditUserspbComponent,
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
export class UserspbRoutingModule {}
