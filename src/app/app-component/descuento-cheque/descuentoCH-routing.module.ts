import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { DescuentoChequeComponent } from './solicitar';




const routes: Routes = [
    { path: '',
      children: [
      { path: '', component: DescuentoChequeComponent,
        canActivate: [UserService],
        data: {roles: ['propuesta','solDescuento']}
      }
                ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class DescuentoCHRoutingModule {}

