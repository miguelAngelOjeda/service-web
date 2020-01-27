import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddTrystTypesComponent , EditTrystTypesComponent, ListTrystTypesComponent,
ViewTrystTypesComponent } from '../tryst-types';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListTrystTypesComponent,
      canActivate: [UserService],
      data: {roles: ['tryst-types', 'listTrystTypes']}
    },
    { path: 'new', component: AddTrystTypesComponent,
      canActivate: [UserService],
      data: {roles: ['tryst-types', 'addTrystTypes']}
    },
    { path: ':id', component: ViewTrystTypesComponent,
      canActivate: [UserService],
      data: {roles: ['tryst-types', 'viewTrystTypes']}
    },
    { path: ':id/edit', component: EditTrystTypesComponent,
      data: {
        allowedRoles: ['tryst-types', 'editTrystTypes']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrystTypesRoutingModule {}
