import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { ListMessageComponent} from '../message';


const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: ListMessageComponent,
      canActivate: [UserService],
      data: {roles: ['message', 'sendMessage']}
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule {}
