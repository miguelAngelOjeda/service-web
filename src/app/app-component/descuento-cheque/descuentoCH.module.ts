import { NgModule } from '@angular/core';
import { SharedModule} from '../../shared';
import { MaterialModule } from '../../core/material/material.module';
import { environment } from '../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from '../../shared/map';
import { DeleteDialogComponent } from '../../shared/dialog';
import { SharedAppModule } from '../shared';
import { DescuentoCHRoutingModule } from './descuentoCH-routing.module';
import { DescuentoChequeComponent } from './solicitar';


@NgModule({
  imports: [
    DescuentoCHRoutingModule,
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
    DeleteDialogComponent
  ],
  declarations: [
    DescuentoChequeComponent
  ],
  providers: [
  ]
})
export class DescuentoCHModule {}