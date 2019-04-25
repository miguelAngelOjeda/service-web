import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { AddPaymentsTypesComponent , EditPaymentsTypesComponent, ListPaymentsTypesComponent,
ViewPaymentsTypesComponent } from '../payments-types';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListPaymentsTypesComponent,
      canActivate: [UserService],
      data: {roles: ['payments-types', 'listPaymentsTypes']}
    },
    { path: 'new', component: AddPaymentsTypesComponent,
      canActivate: [UserService],
      data: {roles: ['payments-types', 'addPaymentsTypes']}
    },
    { path: ':id', component: ViewPaymentsTypesComponent,
      canActivate: [UserService],
      data: {roles: ['payments-types', 'viewPaymentsTypes']}
    },
    { path: ':id/edit', component: EditPaymentsTypesComponent,
      data: {
        allowedRoles: ['payments-types', 'editPaymentsTypes']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsTypesRoutingModule {}
