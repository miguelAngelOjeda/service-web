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
      data: {roles: ['functionary', 'listFunctionary']}
    },
    { path: 'new', component: AddFunctionaryComponent,
      canActivate: [UserService],
      data: {roles: ['functionary', 'addFunctionary']}
    },
    { path: ':id', component: ViewFunctionaryComponent,
      canActivate: [UserService],
      data: {roles: ['functionary', 'viewFunctionary']}
    },
    { path: ':id/edit', component: EditFunctionaryComponent,
      data: {
        allowedRoles: ['functionary', 'editFunctionary']
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
