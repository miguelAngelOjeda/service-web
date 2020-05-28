import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { InformconfComponent } from './report';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: InformconfComponent,
      canActivate: [UserService],
      data: {roles: ['informconf', 'informconfReport']}
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformconfRoutingModule {}
