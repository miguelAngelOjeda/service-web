import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { AddClientComponent , EditClientComponent, ListClientComponent,
ViewClientComponent } from '../client';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListClientComponent,
      canActivate: [UserService],
      data: {roles: ['client', 'listClient']}
    },
    { path: 'new', component: AddClientComponent,
      canActivate: [UserService],
      data: {roles: ['client', 'addClient']}
    },
    { path: ':id', component: ViewClientComponent,
      canActivate: [UserService],
      data: {roles: ['client', 'viewClient']}
    },
    { path: ':id/edit', component: EditClientComponent,
      data: {
        allowedRoles: ['client', 'editClient']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {}
