import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddBusinessComponent , EditBusinessComponent, ListBusinessComponent,
ViewBusinessComponent, AddDialogoSubsidiaryComponent, EditDialogoSubsidiaryComponent } from '../business';
import { CoreModule } from '../../core/core.module';
import { MaterialModule } from '../../core/material/material.module';
import { BusinessRoutingModule } from './business-routing.module';
import { environment } from '../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserModule } from '@angular/platform-browser';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { CanAccessDirective } from '../../shared/can-access.directive';
import { DialogComponent } from '../../shared';
import { LayoutComponent, ShowAuthedDirective, SharedModule} from '../../shared';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    //CoreModule,
    BusinessRoutingModule,
    MaterialModule,
    //BrowserModule,
    FlexLayoutModule,
    SharedModule,
    //BrowserAnimationsModule,
    EcoFabSpeedDialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC_AgWl-WeDY7gMMZoNUbAtp_S2Aw2lRFU'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    //BrowserModule,
    ReactiveFormsModule
  ],
  exports: [
    AddDialogoSubsidiaryComponent,
    EditDialogoSubsidiaryComponent
  ],
  entryComponents: [
    AddDialogoSubsidiaryComponent,
    EditDialogoSubsidiaryComponent,
    DialogComponent
  ],
  declarations: [
    EditDialogoSubsidiaryComponent,
    AddDialogoSubsidiaryComponent,
    AddBusinessComponent,
    EditBusinessComponent,
    ListBusinessComponent,
    DialogComponent,
    ViewBusinessComponent
    //CanAccessDirective,
    //ShowAuthedDirective
  ],
  providers: [

  ]
})
export class BusinessModule {}
