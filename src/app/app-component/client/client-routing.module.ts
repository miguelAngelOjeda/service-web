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
      data: {roles: ['people', 'listPeople']}
    },
    { path: 'new', component: AddClientComponent,
      canActivate: [UserService],
      data: {roles: ['people', 'addPeople']}
    },
    { path: ':id', component: ViewClientComponent,
      canActivate: [UserService],
      data: {roles: ['people', 'viewPeople']}
    },
    { path: ':id/edit', component: EditClientComponent,
      data: {
        allowedRoles: ['people', 'editPeople']
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