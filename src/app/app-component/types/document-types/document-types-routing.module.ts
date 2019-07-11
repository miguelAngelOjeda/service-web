import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddDocumentTypesComponent , EditDocumentTypesComponent, ListDocumentTypesComponent,
ViewDocumentTypesComponent } from '../document-types';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListDocumentTypesComponent,
      canActivate: [UserService],
      data: {roles: ['document-types', 'listDocumentTypes']}
    },
    { path: 'new', component: AddDocumentTypesComponent,
      canActivate: [UserService],
      data: {roles: ['document-types', 'addDocumentTypes']}
    },
    { path: ':id', component: ViewDocumentTypesComponent,
      canActivate: [UserService],
      data: {roles: ['document-types', 'viewDocumentTypes']}
    },
    { path: ':id/edit', component: EditDocumentTypesComponent,
      data: {
        allowedRoles: ['document-types', 'editDocumentTypes']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentTypesRoutingModule {}
