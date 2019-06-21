import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddModalityTypesComponent , EditModalityTypesComponent, ListModalityTypesComponent,
ViewModalityTypesComponent } from '../modality-types';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListModalityTypesComponent,
       canActivate: [UserService],
       data: {roles: ['calculation-types', 'listModalityTypes']}
    },
    { path: 'new', component: AddModalityTypesComponent,
      canActivate: [UserService],
      data: {roles: ['calculation-types', 'addModalityTypes']}
    },
    { path: ':id', component: ViewModalityTypesComponent,
      canActivate: [UserService],
      data: {roles: ['calculation-types', 'viewModalityTypes']}
    },
    { path: ':id/edit', component: EditModalityTypesComponent,
      data: {
        allowedRoles: ['calculation-types', 'editModalityTypes']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModalityTypesRoutingModule {}
