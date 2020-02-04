import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddSpecialtiesComponent , EditSpecialtiesComponent, ListSpecialtiesComponent,
ViewSpecialtiesComponent } from '../specialties';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListSpecialtiesComponent,
      canActivate: [UserService],
      data: {roles: ['specialties', 'listSpecialties']}
    },
    { path: 'new', component: AddSpecialtiesComponent,
      canActivate: [UserService],
      data: {roles: ['specialties', 'addSpecialties']}
    },
    { path: ':id', component: ViewSpecialtiesComponent,
      canActivate: [UserService],
      data: {roles: ['specialties', 'viewSpecialties']}
    },
    { path: ':id/edit', component: EditSpecialtiesComponent,
      //canActivate: [UserService],
      data: {
        allowedRoles: ['specialties', 'editSpecialties']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialtiesRoutingModule {}
