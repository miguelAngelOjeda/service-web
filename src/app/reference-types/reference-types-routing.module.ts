import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../core/services';
import { AddReferenceTypesComponent , EditReferenceTypesComponent, ListReferenceTypesComponent,
ViewReferenceTypesComponent } from '../reference-types';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListReferenceTypesComponent,
      canActivate: [UserService],
      data: {roles: ['reference-types', 'listReferenceTypes']}
    },
    { path: 'new', component: AddReferenceTypesComponent,
      canActivate: [UserService],
      data: {roles: ['reference-types', 'addReferenceTypes']}
    },
    { path: ':id', component: ViewReferenceTypesComponent,
      canActivate: [UserService],
      data: {roles: ['reference-types', 'viewReferenceTypes']}
    },
    { path: ':id/edit', component: EditReferenceTypesComponent,
      data: {
        allowedRoles: ['reference-types', 'editReferenceTypes']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferenceTypesRoutingModule {}
