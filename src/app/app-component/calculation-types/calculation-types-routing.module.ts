import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { AddCalculationTypesComponent , EditCalculationTypesComponent, ListCalculationTypesComponent,
ViewCalculationTypesComponent } from '../calculation-types';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListCalculationTypesComponent,
       canActivate: [UserService],
       data: {roles: ['calculation-types', 'listCalculationTypes']}
    },
    { path: 'new', component: AddCalculationTypesComponent,
      canActivate: [UserService],
      data: {roles: ['calculation-types', 'addCalculationTypes']}
    },
    { path: ':id', component: ViewCalculationTypesComponent,
      canActivate: [UserService],
      data: {roles: ['calculation-types', 'viewCalculationTypes']}
    },
    { path: ':id/edit', component: EditCalculationTypesComponent,
      data: {
        allowedRoles: ['calculation-types', 'editCalculationTypes']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalculationTypesRoutingModule {}
