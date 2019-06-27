import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddRelationsTypesComponent , EditRelationsTypesComponent, ListRelationsTypesComponent,
ViewRelationsTypesComponent } from '../relations-types';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListRelationsTypesComponent,
      canActivate: [UserService],
      data: {roles: ['relations-types', 'listRelationsTypes']}
    },
    { path: 'new', component: AddRelationsTypesComponent,
      canActivate: [UserService],
      data: {roles: ['relations-types', 'addRelationsTypes']}
    },
    { path: ':id', component: ViewRelationsTypesComponent,
      canActivate: [UserService],
      data: {roles: ['relations-types', 'viewRelationsTypes']}
    },
    { path: ':id/edit', component: EditRelationsTypesComponent,
      data: {
        allowedRoles: ['relations-types', 'editRelationsTypes']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelationsTypesRoutingModule {}
