import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddStudyTypesComponent , EditStudyTypesComponent, ListStudyTypesComponent,
ViewStudyTypesComponent } from '../study-types';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListStudyTypesComponent,
      canActivate: [UserService],
      data: {roles: ['study-types', 'listStudyTypes']}
    },
    { path: 'new', component: AddStudyTypesComponent,
      canActivate: [UserService],
      data: {roles: ['study-types', 'addStudyTypes']}
    },
    { path: ':id', component: ViewStudyTypesComponent,
      canActivate: [UserService],
      data: {roles: ['study-types', 'viewStudyTypes']}
    },
    { path: ':id/edit', component: EditStudyTypesComponent,
      data: {
        allowedRoles: ['study-types', 'editStudyTypes']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyTypesRoutingModule {}
