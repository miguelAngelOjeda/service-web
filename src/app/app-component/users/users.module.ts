import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddUsersComponent , EditUsersComponent, ListUsersComponent,
ViewUsersComponent } from '../users';
import { SharedModule} from '../../shared';
import { MaterialModule } from '../../core/material/material.module';
import { UsersRoutingModule } from './users-routing.module';
import { environment } from '../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { DropifyImageComponent } from '../../shared/dropify-image';
import { DeleteDialogComponent } from '../../shared/dialog';

@NgModule({
  imports: [
    //CoreModule,
    UsersRoutingModule,
    MaterialModule,
    //BrowserModule,
    FlexLayoutModule,
    SharedModule,
    //BrowserAnimationsModule,
    EcoFabSpeedDialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    //BrowserModule,
    ReactiveFormsModule
  ],
  exports: [
    DropifyImageComponent,
    DeleteDialogComponent
  ],
  declarations: [
    AddUsersComponent,
    EditUsersComponent,
    ListUsersComponent,
    ViewUsersComponent
    //CanAccessDirective,
    //ShowAuthedDirective
  ],
  providers: [

  ]
})
export class UsersModule {}
