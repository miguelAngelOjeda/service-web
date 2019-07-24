import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddFunctionaryComponent , EditFunctionaryComponent, ListFunctionaryComponent,
ViewFunctionaryComponent } from '../functionary';
import { SharedModule} from '../../../shared';
import { MaterialModule } from '../../../core/material/material.module';
import { FunctionaryRoutingModule } from './functionary-routing.module';
import { environment } from '../../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule } from '@angular/forms';
import { DropifyImageComponent } from '../../../shared/dropify-image';
import { DeleteDialogComponent } from '../../../shared/dialog';
import { PeopleComponent } from '../../shared';
import { ProfileModule } from '../../profile/profile.module';
import { SharedAppModule } from '../../shared';
import { SelectFilterComponent } from '../../../shared/select-filter';

@NgModule({
  imports: [
    FunctionaryRoutingModule,
    ProfileModule,
    MaterialModule,
    SharedAppModule,
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
  entryComponents: [

  ],
  declarations: [
    AddFunctionaryComponent,
    EditFunctionaryComponent,
    ListFunctionaryComponent,
    ViewFunctionaryComponent
    //CanAccessDirective,
    //ShowAuthedDirective
  ],
  providers: [

  ]
})
export class FunctionaryModule {}
