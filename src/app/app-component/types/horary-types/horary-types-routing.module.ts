import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddHoraryTypesComponent , EditHoraryTypesComponent, ListHoraryTypesComponent,
ViewHoraryTypesComponent } from '../horary-types';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListHoraryTypesComponent,
      canActivate: [UserService],
      data: {roles: ['horary-types', 'listHoraryTypes']}
    },
    { path: 'new', component: AddHoraryTypesComponent,
      canActivate: [UserService],
      data: {roles: ['horary-types', 'addHoraryTypes']}
    },
    { path: ':id', component: ViewHoraryTypesComponent,
      canActivate: [UserService],
      data: {roles: ['horary-types', 'viewHoraryTypes']}
    },
    { path: ':id/edit', component: EditHoraryTypesComponent,
      data: {
        allowedRoles: ['horary-types', 'editHoraryTypes']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoraryTypesRoutingModule {}
