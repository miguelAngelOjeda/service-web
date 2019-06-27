import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddBusinessComponent , EditBusinessComponent, ListBusinessComponent,
ViewBusinessComponent, AddDialogoSubsidiaryComponent, EditDialogoSubsidiaryComponent } from '../business';
import { MaterialModule } from '../../core/material/material.module';
import { BusinessRoutingModule } from './business-routing.module';
import { environment } from '../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { DeleteDialogComponent } from '../../shared/dialog';
import { SharedModule} from '../../shared';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { ValidationService } from '../../core/services';
import { MapComponent } from '../../shared/map';
import { DropifyImageComponent } from '../../shared/dropify-image';
import { DepartmentComponent } from '../shared';
import { SharedAppModule } from '../shared';

@NgModule({
  imports: [
    BusinessRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    SharedAppModule,
    EcoFabSpeedDialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC_AgWl-WeDY7gMMZoNUbAtp_S2Aw2lRFU'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    ReactiveFormsModule
  ],
  exports: [
    AddDialogoSubsidiaryComponent,
    EditDialogoSubsidiaryComponent,
    MapComponent,
    DropifyImageComponent,
    DepartmentComponent,
    DeleteDialogComponent
  ],
  entryComponents: [
    AddDialogoSubsidiaryComponent,
    EditDialogoSubsidiaryComponent
  ],
  declarations: [
    EditDialogoSubsidiaryComponent,
    AddDialogoSubsidiaryComponent,
    AddBusinessComponent,
    EditBusinessComponent,
    ListBusinessComponent,
    ViewBusinessComponent
  ],
  providers: [
    ValidationService
  ]
})
export class BusinessModule {}
