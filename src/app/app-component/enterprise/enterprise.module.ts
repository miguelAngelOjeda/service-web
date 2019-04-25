import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddEnterpriseComponent , EditEnterpriseComponent, ListEnterpriseComponent,
ViewEnterpriseComponent } from '../enterprise';
import { CoreModule } from '../../core/core.module';
import { MaterialModule } from '../../core/material/material.module';
import { EnterpriseRoutingModule } from './enterprise-routing.module';
import { environment } from '../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserModule } from '@angular/platform-browser';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { CanAccessDirective } from '../../shared/can-access.directive';
import { LayoutComponent, ShowAuthedDirective, SharedModule} from '../../shared';

@NgModule({
  imports: [
    //CoreModule,
    EnterpriseRoutingModule,
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
  declarations: [
    AddEnterpriseComponent,
    EditEnterpriseComponent,
    ListEnterpriseComponent,
    ViewEnterpriseComponent
    //CanAccessDirective,
    //ShowAuthedDirective
  ],
  providers: [

  ]
})
export class EnterpriseModule {}
