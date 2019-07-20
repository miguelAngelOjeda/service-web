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
import { PeopleRelationshipComponent } from './people-relationship';

@NgModule({
  imports: [
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    EcoFabSpeedDialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    ReactiveFormsModule
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
