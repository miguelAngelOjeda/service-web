import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { AddEgressTypesComponent , EditEgressTypesComponent, ListEgressTypesComponent,
ViewEgressTypesComponent } from '../egress-types';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListEgressTypesComponent,
       canActivate: [UserService],
       data: {roles: ['egress-types', 'listEgressTypes']}
    },
    { path: 'new', component: AddEgressTypesComponent,
      canActivate: [UserService],
      data: {roles: ['egress-types', 'addEgressTypes']}
    },
    { path: ':id', component: ViewEgressTypesComponent,
      canActivate: [UserService],
      data: {roles: ['egress-types', 'viewEgressTypes']}
    },
    { path: ':id/edit', component: EditEgressTypesComponent,
      data: {
        allowedRoles: ['egress-types', 'editEgressTypes']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EgressTypesRoutingModule {}
