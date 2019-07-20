import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddFunctionaryComponent , EditFunctionaryComponent, ListFunctionaryComponent,
ViewFunctionaryComponent } from '../functionary';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListFunctionaryComponent,
      canActivate: [UserService],
      data: {roles: ['users', 'listFunctionary']}
    },
    { path: 'new', component: AddFunctionaryComponent,
      canActivate: [UserService],
      data: {roles: ['users', 'addFunctionary']}
    },
    { path: ':id', component: ViewFunctionaryComponent,
      canActivate: [UserService],
      data: {roles: ['users', 'viewFunctionary']}
    },
    { path: ':id/edit', component: EditFunctionaryComponent,
      data: {
        allowedRoles: ['users', 'editFunctionary']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunctionaryRoutingModule {}
