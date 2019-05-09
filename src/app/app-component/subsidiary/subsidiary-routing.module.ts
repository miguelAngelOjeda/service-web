import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { AddSubsidiaryComponent, EditSubsidiaryComponent, ListSubsidiaryComponent,
ViewSubsidiaryComponent } from '../subsidiary';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListSubsidiaryComponent,
      canActivate: [UserService],
      data: {roles: ['subsidiary', 'listSubsidiary']}
    },
    { path: 'new', component: AddSubsidiaryComponent,
      canActivate: [UserService],
      data: {roles: ['subsidiary', 'addSubsidiary']}
    },
    { path: ':id', component: ViewSubsidiaryComponent,
      canActivate: [UserService],
      data: {roles: ['subsidiary', 'viewSubsidiary']}
    },
    { path: ':id/edit', component: EditSubsidiaryComponent,
      data: {
        allowedRoles: ['subsidiary', 'editSubsidiary']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubsidiaryRoutingModule {}
