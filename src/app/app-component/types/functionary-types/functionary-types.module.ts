import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AddFunctionaryTypesComponent , EditFunctionaryTypesComponent, ListFunctionaryTypesComponent,
ViewFunctionaryTypesComponent } from '../functionary-types';
import { CoreModule } from '../../../core/core.module';
import { MaterialModule } from '../../../core/material/material.module';
import { FunctionaryTypesRoutingModule } from './functionary-types-routing.module';
import { environment } from '../../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { BrowserModule } from '@angular/platform-browser';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatMenuModule} from '@angular/material/menu';
import { MatCheckboxModule} from '@angular/material/checkbox'
import { MatChipsModule} from '@angular/material/chips';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { CanAccessDirective } from '../../../shared/can-access.directive';
import { SharedModule} from '../../../shared';

@NgModule({
  imports: [
    FunctionaryTypesRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    EcoFabSpeedDialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    ReactiveFormsModule
  ],
  declarations: [
    AddFunctionaryTypesComponent,
    EditFunctionaryTypesComponent,
    ListFunctionaryTypesComponent,
    ViewFunctionaryTypesComponent
    //CanAccessDirective,
    //ShowAuthedDirective
  ],
  providers: [

  ]
})
export class FunctionaryTypesModule {}
