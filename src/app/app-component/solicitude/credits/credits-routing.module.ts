import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../../core/services';
import { AddCreditsComponent , EditCreditsComponent, ListCreditsComponent,
ViewCreditsComponent } from '../credits';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListCreditsComponent,
       canActivate: [UserService],
       data: {roles: ['credits', 'lisCredits']}
    },
    { path: 'new', component: AddCreditsComponent,
      canActivate: [UserService],
      data: {roles: ['credits', 'addCredits']}
    },
    { path: ':id', component: ViewCreditsComponent,
      canActivate: [UserService],
      data: {roles: ['credits', 'viewCredits']}
    },
    { path: ':id/edit', component: EditCreditsComponent,
      data: {
        allowedRoles: ['credits', 'editCredits']
      }
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditsRoutingModule {}
