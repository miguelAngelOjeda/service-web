import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from '../../core/services';
import { UploadCuotasWsComponent } from './upload-file';



const routes: Routes = [
  { path: '',
    children: [
    { path: '', component: UploadCuotasWsComponent,
      canActivate: [UserService],
      data: {roles: ['cuotasWs', 'cuotasWsUploadFile']}
    }
              ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CuotasWsRoutingModule {}
