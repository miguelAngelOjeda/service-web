import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListCreditsComponent,
  DisburseCreditsComponent, ViewCreditsComponent, EditCreditsComponent } from '../credits';
import { FilterSheetComponent } from '../credits/list-credits/filter-sheet/filter-sheet.component';
import { MaterialModule } from '../../core/material/material.module';
import { CreditsRoutingModule } from './credits-routing.module';
import { environment } from '../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from '../../shared/map';
import { SharedModule, SnackbarComponent} from '../../shared';
import { DeleteDialogComponent } from '../../shared/dialog';
import { DepartmentComponent } from '../shared';
import { SharedAppModule} from '../shared';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { ReferenceComponent, EstateComponent,OccupationComponent,ViewVehicleComponent,
  ViewReferenceComponent,ViewIngressComponent,ViewEgressComponent,ViewPeopleComponent,
  ViewOccupationComponent,ViewEstateComponent,
   VehicleComponent, IngressComponent, EgressComponent, PeopleComponent } from '../shared';
import { NgxCurrencyModule } from "ngx-currency";
import { PrintCreditsComponent } from './print-credits/print-credits.component';

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
    CreditsRoutingModule,
    MaterialModule,
    SharedAppModule,
    AngularFileUploaderModule,
    FlexLayoutModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    SharedModule,
    EcoFabSpeedDialModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB25HfMgLL_oEjj8RhzmOsJoqWcxlTkE-k'
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
    ListCreditsComponent,
    EditCreditsComponent,
    DisburseCreditsComponent,
    ViewCreditsComponent,
    FilterSheetComponent,
    PrintCreditsComponent
  ],
  entryComponents: [
    FilterSheetComponent
  ],
})
export class CreditsModule {}
