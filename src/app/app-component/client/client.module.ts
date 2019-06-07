import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddClientComponent , EditClientComponent, ListClientComponent,
ViewClientComponent } from '../client';
import { SharedModule} from '../../shared';
import { MaterialModule } from '../../core/material/material.module';
import { ClientRoutingModule } from './client-routing.module';
import { environment } from '../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from '../../shared/map';
import { DeleteDialogComponent } from '../../shared/dialog';
import { DropifyImageComponent } from '../../shared/dropify-image';
import { SelectFilterComponent } from '../../shared/select-filter';
import { ReferenceComponent, EstateComponent,OccupationComponent,
   VehicleComponent, IngressComponent, EgressComponent, PeopleComponent } from '../core';
import { CoreAppModule } from '../core';

@NgModule({
  imports: [
    ClientRoutingModule,
    MaterialModule,
    SharedModule,
    FlexLayoutModule,
    CoreAppModule,
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
    DeleteDialogComponent,
    ReferenceComponent,
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
    AddClientComponent,
    EditClientComponent,
    ListClientComponent,
    ViewClientComponent
    //ShowAuthedDirective
  ],
  providers: [
  ]
})
export class ClientModule {}
