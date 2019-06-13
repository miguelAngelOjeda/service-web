import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddCreditsComponent, EditCreditsComponent, ListCreditsComponent,
ViewCreditsComponent } from '../credits';
import { MaterialModule } from '../../../core/material/material.module';
import { CreditsRoutingModule } from './credits-routing.module';
import { environment } from '../../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from '../../../shared/map';
import { SharedModule} from '../../../shared';
import { DeleteDialogComponent } from '../../../shared/dialog';
import { DepartmentComponent } from '../../shared';
import { SharedAppModule} from '../../shared';

@NgModule({
  imports: [
    CreditsRoutingModule,
    MaterialModule,
    SharedAppModule,
    FlexLayoutModule,
    SharedModule,
    EcoFabSpeedDialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC_AgWl-WeDY7gMMZoNUbAtp_S2Aw2lRFU'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    ReactiveFormsModule
  ],
  exports: [
    MapComponent,
    DepartmentComponent,
    DeleteDialogComponent
  ],
  declarations: [
    AddCreditsComponent,
    EditCreditsComponent,
    ListCreditsComponent,
    ViewCreditsComponent
  ],
  providers: [

  ]
})
export class CreditsModule {}
