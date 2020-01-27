import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddTrystStatusComponent , EditTrystStatusComponent, ListTrystStatusComponent,
ViewTrystStatusComponent } from '../tryst-status';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListTrystStatusComponent,
      canActivate: [UserService],
      data: {roles: ['tryst-status', 'listTrystStatus']}
    },
    { path: 'new', component: AddTrystStatusComponent,
      canActivate: [UserService],
      data: {roles: ['tryst-status', 'addTrystStatus']}
    },
    { path: ':id', component: ViewTrystStatusComponent,
      canActivate: [UserService],
      data: {roles: ['tryst-status', 'viewTrystStatus']}
    },
    { path: ':id/edit', component: EditTrystStatusComponent,
      data: {
        allowedRoles: ['tryst-status', 'editTrystStatus']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrystStatusRoutingModule {}
