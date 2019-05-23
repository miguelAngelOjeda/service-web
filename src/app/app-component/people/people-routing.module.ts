import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { AddPeopleComponent , EditPeopleComponent, ListPeopleComponent,
ViewPeopleComponent } from '../people';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListPeopleComponent,
      canActivate: [UserService],
      data: {roles: ['people', 'listPeople']}
    },
    { path: 'new', component: AddPeopleComponent,
      canActivate: [UserService],
      data: {roles: ['people', 'addPeople']}
    },
    { path: ':id', component: ViewPeopleComponent,
      canActivate: [UserService],
      data: {roles: ['people', 'viewPeople']}
    },
    { path: ':id/edit', component: EditPeopleComponent,
      data: {
        allowedRoles: ['people', 'editPeople']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule {}
