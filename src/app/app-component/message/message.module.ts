import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListMessageComponent,
ViewMessageComponent} from '.';
import { SharedModule} from '../../shared';
import { MaterialModule } from '../../core/material/material.module';
import { MessageRoutingModule } from './message-routing.module';
import { environment } from '../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { FileUploadModule } from "ng2-file-upload";
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from '../../shared/map';
import { DeleteDialogComponent } from '../../shared/dialog';
import { DropifyImageComponent } from '../../shared/dropify-image';
import { SelectFilterComponent } from '../../shared/select-filter';
import { ReferenceComponent, EstateComponent,OccupationComponent,ViewVehicleComponent,
  ViewReferenceComponent,ViewIngressComponent,ViewEgressComponent,ViewPeopleComponent,
  ViewOccupationComponent,ViewEstateComponent,
   VehicleComponent, IngressComponent, EgressComponent, PeopleComponent } from '../shared';
import { SharedAppModule } from '../shared';

@NgModule({
  imports: [
    MessageRoutingModule,
    FileUploadModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
    SharedAppModule,
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
    DeleteDialogComponent,
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
    PeopleComponent,
    DropifyImageComponent,
    OccupationComponent,
    SelectFilterComponent
  ],
  declarations: [
    ListMessageComponent,
    ViewMessageComponent
  ],
  providers: [
  ]
})
export class MessageModule {}
