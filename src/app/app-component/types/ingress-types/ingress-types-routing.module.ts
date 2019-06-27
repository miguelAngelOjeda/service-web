import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddIngressTypesComponent , EditIngressTypesComponent, ListIngressTypesComponent,
ViewIngressTypesComponent } from '../ingress-types';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListIngressTypesComponent,
       canActivate: [UserService],
       data: {roles: ['ingress-types', 'listIngressTypes']}
    },
    { path: 'new', component: AddIngressTypesComponent,
      canActivate: [UserService],
      data: {roles: ['ingress-types', 'addIngressTypes']}
    },
    { path: ':id', component: ViewIngressTypesComponent,
      canActivate: [UserService],
      data: {roles: ['ingress-types', 'viewIngressTypes']}
    },
    { path: ':id/edit', component: EditIngressTypesComponent,
      data: {
        allowedRoles: ['ingress-types', 'editIngressTypes']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IngressTypesRoutingModule {}
