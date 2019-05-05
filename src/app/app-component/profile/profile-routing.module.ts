import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { ViewProfileComponent } from '../profile';


const routes: Routes = [
  { path: '',
    children: [
    { path: ':id', component: ViewProfileComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
