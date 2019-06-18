import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule} from '../../shared';
import { MaterialModule } from '../../core/material/material.module';
import { UserspbRoutingModule } from './userspb-routing.module';
import { environment } from '../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { DropifyImageComponent } from '../../shared/dropify-image';
import { DeleteDialogComponent } from '../../shared/dialog';
import { PeopleComponent } from '../core';
import { SelectFilterComponent } from '../../shared/select-filter';
import { CoreAppModule } from '../core';
import { AddUserspbComponent } from './add-userspb/add-userspb.component';
import { EditUserspbComponent } from './edit-userspb/edit-userspb.component';
import { ViewUserspbComponent } from './view-userspb/view-userspb.component';
import {ListUserspbComponent} from '../userspb';

@NgModule({
  imports: [
    UserspbRoutingModule,
    MaterialModule,
    CoreAppModule,
    FlexLayoutModule,
    SharedModule,
    EcoFabSpeedDialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    ReactiveFormsModule
  ],
  exports: [
    DropifyImageComponent,
    SelectFilterComponent,
    PeopleComponent,
    DeleteDialogComponent
  ],
  declarations: [
    ListUserspbComponent,
    AddUserspbComponent,
    EditUserspbComponent,
    ViewUserspbComponent
    //CanAccessDirective,
    //ShowAuthedDirective
  ],
  providers: [
  ]
})
export class UserspbModule {}
