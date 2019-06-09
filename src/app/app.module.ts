import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LayoutModule } from '@angular/cdk/layout';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HomeComponent } from './app-component/home';
import { FullComponent } from './navigation/full.component';
import { ShowAuthedDirective, SharedModule, LoaderComponent} from './shared';
import { CanAccessDirective } from './shared/can-access.directive';
import { HeaderComponent, SidenavListComponent } from './navigation';
import { LoginComponent } from './login';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './core/material/material.module';
import { JwtModule } from '@auth0/angular-jwt';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { SpinnerComponent } from './shared/spinner';
import { SharedAppModule } from './app-component/shared';
import * as $ from 'jquery';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoaderComponent,
    FullComponent,
    HeaderComponent,
    SpinnerComponent,
    HomeComponent,
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    SharedAppModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    EcoFabSpeedDialModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    LayoutModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
        //AuthGuard
        //{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
        //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
