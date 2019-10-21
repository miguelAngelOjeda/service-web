import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddExitTypesComponent , EditExitTypesComponent, ListExitTypesComponent,
ViewExitTypesComponent } from '../exit-types';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListExitTypesComponent,
       canActivate: [UserService],
       data: {roles: ['exit-types', 'listExitTypes']}
    },
    { path: 'new', component: AddExitTypesComponent,
      canActivate: [UserService],
      data: {roles: ['exit-types', 'addExitTypes']}
    },
    { path: ':id', component: ViewExitTypesComponent,
      canActivate: [UserService],
      data: {roles: ['exit-types', 'viewExitTypes']}
    },
    { path: ':id/edit', component: EditExitTypesComponent,
      canActivate: [UserService],
      data: {roles: ['exit-types', 'editExitTypes']}
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExitTypesRoutingModule {}
