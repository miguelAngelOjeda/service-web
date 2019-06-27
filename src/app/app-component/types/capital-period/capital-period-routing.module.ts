import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddCapitalPeriodComponent , EditCapitalPeriodComponent, ListCapitalPeriodComponent,
ViewCapitalPeriodComponent } from '../capital-period';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListCapitalPeriodComponent,
       canActivate: [UserService],
       data: {roles: ['capital-period', 'listCapitalPeriod']}
    },
    { path: 'new', component: AddCapitalPeriodComponent,
      canActivate: [UserService],
      data: {roles: ['capital-period', 'addCapitalPeriod']}
    },
    { path: ':id', component: ViewCapitalPeriodComponent,
      canActivate: [UserService],
      data: {roles: ['capital-period', 'viewCapitalPeriod']}
    },
    { path: ':id/edit', component: EditCapitalPeriodComponent,
      data: {
        allowedRoles: ['capital-period', 'editCapitalPeriod']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapitalPeriodRoutingModule {}
