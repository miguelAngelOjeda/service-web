import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { ListCreditsComponent } from '../credits';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListCreditsComponent,
       canActivate: [UserService],
       data: {roles: ['credits', 'listCredits']}
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreditsRoutingModule {}
