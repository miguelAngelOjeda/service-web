import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { PropuestaComponent } from './solicitar';


const routes: Routes = [
    { path: '',
      children: [
      { path: '', component: PropuestaComponent,
        canActivate: [UserService],
        data: {roles: ['propuesta','listPropuesta']}
      }
                ]
    }
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class PropuestaRoutingModule {}

