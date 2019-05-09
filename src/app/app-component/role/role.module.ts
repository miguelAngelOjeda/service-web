import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddRoleComponent , EditRoleComponent, ListRoleComponent,
ViewRoleComponent } from '../role';
import { CoreModule } from '../../core/core.module';
import { MaterialModule } from '../../core/material/material.module';
import { RoleRoutingModule } from './role-routing.module';
import { environment } from '../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { DialogComponent } from '../../shared';
import { CanAccessDirective } from '../../shared/can-access.directive';
import { LayoutComponent, ShowAuthedDirective, SharedModule} from '../../shared';

@NgModule({
  imports: [
    RoleRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    EcoFabSpeedDialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    ReactiveFormsModule
  ],
  declarations: [
    AddRoleComponent,
    EditRoleComponent,
    ListRoleComponent,
    ViewRoleComponent
  ],
  exports: [
    DialogComponent
  ],
  providers: [

  ]
})
export class RoleModule {}
