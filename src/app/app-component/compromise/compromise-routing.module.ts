import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { AddClientComponent , EditCompromiseComponent, ListCompromiseComponent,
ViewCompromiseComponent, CompromiseClientComponent } from '../compromise';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListCompromiseComponent,
      canActivate: [UserService],
      data: {roles: ['client', 'listClient']}
    },
    { path: 'new', component: AddClientComponent,
      canActivate: [UserService],
      data: {roles: ['client', 'addClient']}
    },
    { path: ':id', component: ViewCompromiseComponent,
      canActivate: [UserService],
      data: {roles: ['client', 'viewClient']}
    },
    { path: ':id/edit', component: EditCompromiseComponent,
      data: {
        allowedRoles: ['client', 'editClient']
      }
    },
    { path: ':id/compromise', component: CompromiseClientComponent,
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
export class CompromiseRoutingModule {}
