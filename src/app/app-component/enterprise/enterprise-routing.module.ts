import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { AddEnterpriseComponent , EditEnterpriseComponent, ListEnterpriseComponent,
ViewEnterpriseComponent } from '../enterprise';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListEnterpriseComponent,
       canActivate: [UserService],
       data: {roles: ['enterprise', 'listEnterprise']}
    },
    { path: 'new', component: AddEnterpriseComponent,
      canActivate: [UserService],
      data: {roles: ['enterprise', 'addEnterprise']}
    },
    { path: ':id', component: ViewEnterpriseComponent,
      canActivate: [UserService],
      data: {roles: ['enterprise', 'viewEnterprise']}
    },
    { path: ':id/edit', component: EditEnterpriseComponent,
      data: {
        allowedRoles: ['enterprise', 'editEnterprise']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnterpriseRoutingModule {}
