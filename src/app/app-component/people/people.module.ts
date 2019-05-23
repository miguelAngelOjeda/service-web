import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddPeopleComponent , EditPeopleComponent, ListPeopleComponent,
ViewPeopleComponent } from '../people';
import { SharedModule} from '../../shared';
import { MaterialModule } from '../../core/material/material.module';
import { PeopleRoutingModule } from './people-routing.module';
import { environment } from '../../../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';


@NgModule({
  imports: [
    //CoreModule,
    PeopleRoutingModule,
    MaterialModule,
    //BrowserModule,
    FlexLayoutModule,
    SharedModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC_AgWl-WeDY7gMMZoNUbAtp_S2Aw2lRFU'
    }),
    EcoFabSpeedDialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    //BrowserModule,
    ReactiveFormsModule
  ],
  declarations: [
    AddPeopleComponent,
    EditPeopleComponent,
    ListPeopleComponent,
    ViewPeopleComponent
    //CanAccessDirective,
    //ShowAuthedDirective
  ],
  providers: [

  ]
})
export class PeopleModule {}
