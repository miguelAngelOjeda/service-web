import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddCreditsComponent, EditCreditsComponent, ListCreditsComponent,
ViewCreditsComponent } from '../credits';
import { MaterialModule } from '../../../core/material/material.module';
import { CreditsSolicitudeRoutingModule } from './credits-solicitude-routing.module';
import { environment } from '../../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from '../../../shared/map';
import { SharedModule, SnackbarComponent} from '../../../shared';
import { DeleteDialogComponent } from '../../../shared/dialog';
import { DepartmentComponent } from '../../shared';
import { SharedAppModule} from '../../shared';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { ReferenceComponent, EstateComponent,OccupationComponent,ViewVehicleComponent,
  ViewReferenceComponent,ViewIngressComponent,ViewEgressComponent,ViewPeopleComponent,
  ViewOccupationComponent,ViewEstateComponent,
   VehicleComponent, IngressComponent, EgressComponent, PeopleComponent } from '../../shared';
import { ImageViewerModule } from 'ng2-image-viewer';
import { NgxCurrencyModule } from "ngx-currency";

export const customCurrencyMaskConfig = {
    align: "right",
    allowNegative: false,
    allowZero: true,
    decimal: ",",
    precision: 0,
    prefix: "G ",
    suffix: "",
    thousands: ".",
    nullable: false
};

@NgModule({
  imports: [
    CreditsSolicitudeRoutingModule,
    MaterialModule,
    SharedAppModule,
    AngularFileUploaderModule,
    ImageViewerModule,
    FlexLayoutModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
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
    ReferenceComponent,
    ViewReferenceComponent,
    ViewOccupationComponent,
    ViewEstateComponent,
    ViewVehicleComponent,
    ViewIngressComponent,
    ViewEgressComponent,
    ViewPeopleComponent,
    EstateComponent,
    VehicleComponent,
    IngressComponent,
    EgressComponent,
    OccupationComponent,
    PeopleComponent,
    DeleteDialogComponent
  ],
  declarations: [
    AddCreditsComponent,
    EditCreditsComponent,
    ListCreditsComponent,
    ViewCreditsComponent
  ]
})
export class CreditsSolicitudeModule {}
