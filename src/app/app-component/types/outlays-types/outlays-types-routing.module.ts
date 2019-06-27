import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddOutlaysTypesComponent , EditOutlaysTypesComponent, ListOutlaysTypesComponent,
ViewOutlaysTypesComponent } from '../outlays-types';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListOutlaysTypesComponent,
       canActivate: [UserService],
       data: {roles: ['outlays-types', 'listOutlaysTypes']}
    },
    { path: 'new', component: AddOutlaysTypesComponent,
      canActivate: [UserService],
      data: {roles: ['outlays-types', 'addOutlaysTypes']}
    },
    { path: ':id', component: ViewOutlaysTypesComponent,
      canActivate: [UserService],
      data: {roles: ['outlays-types', 'viewOutlaysTypes']}
    },
    { path: ':id/edit', component: EditOutlaysTypesComponent,
      data: {
        allowedRoles: ['outlays-types', 'editOutlaysTypes']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutlaysTypesRoutingModule {}
