import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../core/services';
import { AddDestinationsTypesComponent , EditDestinationsTypesComponent, ListDestinationsTypesComponent,
ViewDestinationsTypesComponent } from '../destinations-types';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListDestinationsTypesComponent,
      canActivate: [UserService],
      data: {roles: ['destinations-types', 'listDestinationsTypes']}
    },
    { path: 'new', component: AddDestinationsTypesComponent,
      canActivate: [UserService],
      data: {roles: ['destinations-types', 'addDestinationsTypes']}
    },
    { path: ':id', component: ViewDestinationsTypesComponent,
      canActivate: [UserService],
      data: {roles: ['destinations-types', 'viewDestinationsTypes']}
    },
    { path: ':id/edit', component: EditDestinationsTypesComponent,
      data: {
        allowedRoles: ['destinations-types', 'editDestinationsTypes']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DestinationsTypesRoutingModule {}
