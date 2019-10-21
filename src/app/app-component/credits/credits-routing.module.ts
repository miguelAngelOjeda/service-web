import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { EditCreditsComponent, ListCreditsComponent,
ViewCreditsComponent } from '../credits';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListCreditsComponent,
       canActivate: [UserService],
       data: {roles: ['credits', 'listCredits']}
    },
    { path: ':id', component: ViewCreditsComponent,
      canActivate: [UserService],
      data: {roles: ['credits-solicitude', 'viewCredits']}
    },
    { path: ':id/edit', component: EditCreditsComponent,
      data: {
        allowedRoles: ['credits-solicitude', 'editCredits']
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
