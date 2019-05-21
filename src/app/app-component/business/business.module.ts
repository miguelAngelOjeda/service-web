import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddBusinessComponent , EditBusinessComponent, ListBusinessComponent,
ViewBusinessComponent, AddDialogoSubsidiaryComponent, EditDialogoSubsidiaryComponent } from '../business';
import { MaterialModule } from '../../core/material/material.module';
import { BusinessRoutingModule } from './business-routing.module';
import { environment } from '../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { CanAccessDirective } from '../../shared/can-access.directive';
import { DeleteDialogComponent } from '../../shared/dialog';
import { ShowAuthedDirective, SharedModule} from '../../shared';
import { AgmCoreModule } from '@agm/core';
import { ControlMessagesComponent } from '../../shared/control-messages.component';
import { ValidationService } from '../../core/services';
@NgModule({
  imports: [
    BusinessRoutingModule,
    MaterialModule,
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
    AddDialogoSubsidiaryComponent,
    EditDialogoSubsidiaryComponent,
    DeleteDialogComponent
  ],
  entryComponents: [
    AddDialogoSubsidiaryComponent,
    EditDialogoSubsidiaryComponent
  ],
  declarations: [
    ControlMessagesComponent,
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
