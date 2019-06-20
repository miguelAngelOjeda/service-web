import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddGuaranteeTypesComponent , EditGuaranteeTypesComponent, ListGuaranteeTypesComponent,
ViewGuaranteeTypesComponent } from '../guarantee-types';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListGuaranteeTypesComponent,
       canActivate: [UserService],
       data: {roles: ['guarantee-types', 'listGuaranteeTypes']}
    },
    { path: 'new', component: AddGuaranteeTypesComponent,
      canActivate: [UserService],
      data: {roles: ['guarantee-types', 'addGuaranteeTypes']}
    },
    { path: ':id', component: ViewGuaranteeTypesComponent,
      canActivate: [UserService],
      data: {roles: ['guarantee-types', 'viewGuaranteeTypes']}
    },
    { path: ':id/edit', component: EditGuaranteeTypesComponent,
      data: {
        allowedRoles: ['guarantee-types', 'editGuaranteeTypes']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GuaranteeTypesRoutingModule {}
