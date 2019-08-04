import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../core/material/material.module';
import { environment } from '../../../environments/environment';
import { ReferenceComponent, ViewReferenceComponent } from './reference';
import { StudiesComponent, ViewStudiesComponent } from './studies';
import { EstateComponent, ViewEstateComponent } from './estate';
import { VehicleComponent, ViewVehicleComponent } from './vehicle';
import { DeleteDialogComponent } from '../../shared/dialog';
import { ShowAuthedDirective, SharedModule} from '../../shared';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ServiceWorkerModule } from '@angular/service-worker';
import { IngressComponent, ViewIngressComponent } from './ingress';
import { EgressComponent, ViewEgressComponent } from './egress';
import { PeopleComponent, ViewPeopleComponent } from './people';
import { DepartmentComponent } from './department';
import { OccupationComponent, ViewOccupationComponent } from './occupation';
import { PeopleRelationshipComponent, ViewPeopleRelationsComponent,
   EditModalPeopleComponent, AddModalPeopleComponent, ViewModalPeopleComponent } from './people-relationship';
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
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    EcoFabSpeedDialModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    EditModalPeopleComponent,
    AddModalPeopleComponent,
    ViewModalPeopleComponent,
  ],
  declarations: [
    StudiesComponent,
    ViewStudiesComponent,
    ViewReferenceComponent,
    ViewVehicleComponent,
    ViewIngressComponent,
    ViewEgressComponent,
    ViewEstateComponent,
    ViewPeopleComponent,
    ViewPeopleRelationsComponent,
    EditModalPeopleComponent,
    AddModalPeopleComponent,
    ViewModalPeopleComponent,
    ViewOccupationComponent,
    ReferenceComponent,
    EstateComponent,
    VehicleComponent,
    IngressComponent,
    PeopleComponent,
    DepartmentComponent,
    EgressComponent,
    PeopleRelationshipComponent,
    OccupationComponent
  ],
  exports: [
    DeleteDialogComponent,
    StudiesComponent,
    ViewStudiesComponent,
    EstateComponent,
    VehicleComponent,
    ReferenceComponent,
    IngressComponent,
    PeopleComponent,
    ViewPeopleRelationsComponent,
    ViewReferenceComponent,
    ViewEstateComponent,
    ViewOccupationComponent,
    ViewVehicleComponent,
    ViewIngressComponent,
    ViewEgressComponent,
    ViewPeopleComponent,
    DepartmentComponent,
    EgressComponent,
    PeopleRelationshipComponent,
    OccupationComponent
  ]
})
export class SharedAppModule {}
