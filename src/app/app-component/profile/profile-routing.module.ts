import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { ViewProfileComponent, PasswordProfileComponent } from '../profile';


const routes: Routes = [
  { path: '',
    children: [
    { path: ':id', component: ViewProfileComponent},
    { path: ':id/password', component: PasswordProfileComponent},
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
