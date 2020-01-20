import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '@core/service';
import { AddRequestComponent, AddMemberRequestComponent } from '../member';


const routes: Routes = [
  { path: '',
    children: [
    { path: 'emails', component: AddRequestComponent,
      canActivate: [UserService],
      data: {roles: ['client', 'addClient']}
    },
    { path: 'add', component: AddMemberRequestComponent,
      canActivate: [UserService],
      data: {roles: ['client', 'addClient']}
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {}
