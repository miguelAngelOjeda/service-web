import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddGuaranteeTypesComponent , EditGuaranteeTypesComponent, ListGuaranteeTypesComponent,
ViewGuaranteeTypesComponent } from '../guarantee-types';
import { MaterialModule } from '../../../core/material/material.module';
import { GuaranteeTypesRoutingModule } from './guarantee-types-routing.module';
import { environment } from '../../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { CanAccessDirective } from '../../../shared/can-access.directive';
import { SharedModule} from '../../../shared';

@NgModule({
  imports: [
    GuaranteeTypesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    EcoFabSpeedDialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    ReactiveFormsModule
  ],
  declarations: [
    AddGuaranteeTypesComponent,
    EditGuaranteeTypesComponent,
    ListGuaranteeTypesComponent,
    ViewGuaranteeTypesComponent
    //CanAccessDirective,
    //ShowAuthedDirective
  ],
  providers: [

  ]
})
export class GuaranteeTypesModule {}
