import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddPositionTypesComponent , EditPositionTypesComponent, ListPositionTypesComponent,
ViewPositionTypesComponent } from '../position-types';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListPositionTypesComponent,
      canActivate: [UserService],
      data: {roles: ['position-types', 'listPositionTypes']}
    },
    { path: 'new', component: AddPositionTypesComponent,
      canActivate: [UserService],
      data: {roles: ['position-types', 'addPositionTypes']}
    },
    { path: ':id', component: ViewPositionTypesComponent,
      canActivate: [UserService],
      data: {roles: ['position-types', 'viewPositionTypes']}
    },
    { path: ':id/edit', component: EditPositionTypesComponent,
      canActivate: [UserService],
      data: {
        roles: ['position-types', 'editPositionTypes']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionTypesRoutingModule {}
