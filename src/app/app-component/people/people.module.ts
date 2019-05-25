import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddPeopleComponent , EditPeopleComponent, ListPeopleComponent,
ViewPeopleComponent } from '../people';
import { SharedModule} from '../../shared';
import { MaterialModule } from '../../core/material/material.module';
import { PeopleRoutingModule } from './people-routing.module';
import { environment } from '../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from '../../shared/map';
import { DeleteDialogComponent } from '../../shared/dialog';

@NgModule({
  imports: [
    PeopleRoutingModule,
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
    MapComponent,
    DeleteDialogComponent
  ],
  declarations: [
    AddPeopleComponent,
    EditPeopleComponent,
    ListPeopleComponent,
    ViewPeopleComponent
    //ShowAuthedDirective
  ],
  providers: [
  ]
})
export class PeopleModule {}