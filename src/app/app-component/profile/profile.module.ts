import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewProfileComponent, PasswordProfileComponent } from '../profile';
import { SharedModule} from '../../shared';
import { MaterialModule } from '../../core/material/material.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { environment } from '../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';


@NgModule({
  imports: [
    ProfileRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    EcoFabSpeedDialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    ReactiveFormsModule
  ],
  declarations: [
    ViewProfileComponent,
    PasswordProfileComponent
  ],
  providers: [

  ]
})
export class ProfileModule {}
