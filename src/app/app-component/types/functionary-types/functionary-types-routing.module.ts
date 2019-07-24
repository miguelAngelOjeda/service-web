import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddFunctionaryTypesComponent , EditFunctionaryTypesComponent, ListFunctionaryTypesComponent,
ViewFunctionaryTypesComponent } from '../functionary-types';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListFunctionaryTypesComponent,
      canActivate: [UserService],
      data: {roles: ['functionary-types', 'listFunctionaryTypes']}
    },
    { path: 'new', component: AddFunctionaryTypesComponent,
      canActivate: [UserService],
      data: {roles: ['functionary-types', 'addFunctionaryTypes']}
    },
    { path: ':id', component: ViewFunctionaryTypesComponent,
      canActivate: [UserService],
      data: {roles: ['functionary-types', 'viewFunctionaryTypes']}
    },
    { path: ':id/edit', component: EditFunctionaryTypesComponent,
      data: {
        allowedRoles: ['functionary-types', 'editFunctionaryTypes']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunctionaryTypesRoutingModule {}
