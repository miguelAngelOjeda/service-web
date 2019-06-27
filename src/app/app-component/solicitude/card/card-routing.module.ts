import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddCardComponent , EditCardComponent, ListCardComponent,
ViewCardComponent } from '../card';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListCardComponent,
       canActivate: [UserService],
       data: {roles: ['enterprise', 'listEnterprise']}
    },
    { path: 'new', component: AddCardComponent,
      canActivate: [UserService],
      data: {roles: ['enterprise', 'addEnterprise']}
    },
    { path: ':id', component: ViewCardComponent,
      canActivate: [UserService],
      data: {roles: ['enterprise', 'viewEnterprise']}
    },
    { path: ':id/edit', component: EditCardComponent,
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
export class CardRoutingModule {}
