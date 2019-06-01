import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddSubsidiaryComponent, EditSubsidiaryComponent, ListSubsidiaryComponent,
ViewSubsidiaryComponent } from '../subsidiary';
import { MaterialModule } from '../../core/material/material.module';
import { SubsidiaryRoutingModule } from './subsidiary-routing.module';
import { environment } from '../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from '../../shared/map';
import { SharedModule} from '../../shared';
import { DeleteDialogComponent } from '../../shared/dialog';
import { CoreAppModule } from '../core';
import { DepartmentComponent } from '../core';

@NgModule({
  imports: [
    SubsidiaryRoutingModule,
    MaterialModule,
    CoreAppModule,
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
    AddSubsidiaryComponent,
    EditSubsidiaryComponent,
    ListSubsidiaryComponent,
    ViewSubsidiaryComponent
  ],
  providers: [

  ]
})
export class SubsidiaryModule {}
