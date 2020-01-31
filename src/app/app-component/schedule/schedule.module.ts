import { ModuleWithProviders, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CalendarComponent  } from './calendar';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../core/material/material.module';
import { ScheduleRoutingModule } from './schedule-routing.module';
import { environment } from '../../../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule} from '@angular/flex-layout';
import { ServiceWorkerModule } from '@angular/service-worker';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ReactiveFormsModule }    from '@angular/forms';
import { EditModalScheduleComponent } from './modal-schedule/edit-modal-schedule';
import { AddModalScheduleComponent } from './modal-schedule/add-modal-schedule';
import { ViewModalScheduleComponent } from './modal-schedule/view-modal-schedule';
import localeEs from '@angular/common/locales/es';
import { DeleteDialogComponent } from '../../shared/dialog';
import { SharedModule} from '../../shared';
import { SharedAppModule } from '../shared';

registerLocaleData(localeEs);

@NgModule({
  imports: [
    ScheduleRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    SharedAppModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    LayoutModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    EditModalScheduleComponent,
    AddModalScheduleComponent,
    ViewModalScheduleComponent,
  ],
  exports: [
    DeleteDialogComponent,
    CalendarComponent
  ],
  declarations: [
    CalendarComponent,
    EditModalScheduleComponent,
    AddModalScheduleComponent,
    ViewModalScheduleComponent
  ]
})
export class ScheduleModule {}
