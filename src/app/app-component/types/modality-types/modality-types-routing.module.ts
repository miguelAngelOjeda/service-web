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
       data: {roles: ['modality', 'listModality']}
    },
    { path: 'new', component: AddModalityTypesComponent,
      canActivate: [UserService],
      data: {roles: ['modality', 'addModality']}
    },
    { path: ':id', component: ViewModalityTypesComponent,
      canActivate: [UserService],
      data: {roles: ['modality', 'viewModality']}
    },
    { path: ':id/edit', component: EditModalityTypesComponent,
      data: {
        allowedRoles: ['modality', 'editModality']
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
