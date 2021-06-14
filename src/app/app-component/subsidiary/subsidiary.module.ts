import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddSubsidiaryComponent, EditSubsidiaryComponent, ListSubsidiaryComponent,
ViewSubsidiaryComponent } from '../subsidiary';
import { MaterialModule } from '../../core/material/material.module';
import { SubsidiaryRoutingModule } from './subsidiary-routing.module';
import { environment } from '../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { MapComponent } from '../../shared/map';
import { SharedModule} from '../../shared';
import { DeleteDialogComponent } from '../../shared/dialog';
import { DepartmentComponent } from '../shared';
import { SharedAppModule } from '../shared';

@NgModule({
  imports: [
    SubsidiaryRoutingModule,
    MaterialModule,
    SharedAppModule,
    FlexLayoutModule,
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
    DeleteDialogComponent
  ],
  declarations: [
    AddSubsidiaryComponent,
    EditSubsidiaryComponent,
    ListSubsidiaryComponent,
    ViewSubsidiaryComponent
  ],
  providers: [

  ]
})
export class SubsidiaryModule {}
