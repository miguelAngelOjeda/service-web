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
import { AlertComponent } from './directives';
import { AuthGuard } from './guards';
import { UsersComponent } from './users';
import { HomeComponent } from './home';
import { LayoutComponent, ShowAuthedDirective, ListErrorsComponent } from './shared';
import { HeaderComponent, SidenavListComponent } from './navigation';
import { LoginComponent } from './login';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './core/material/material.module';
import { JwtModule } from '@auth0/angular-jwt';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { ListEnterpriseComponent } from './enterprise/list-enterprise/list-enterprise.component';
import { ActivateEnterpriseComponent } from './enterprise/activate-enterprise/activate-enterprise.component';
import { AddEnterpriseComponent } from './enterprise/add-enterprise/add-enterprise.component';
import { DeleteEnterpriseComponent } from './enterprise/delete-enterprise/delete-enterprise.component';
import { EditEnterpriseComponent } from './enterprise/edit-enterprise/edit-enterprise.component';
import { ViewEnterpriseComponent } from './enterprise/view-enterprise/view-enterprise.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    LayoutComponent,
    AlertComponent,
    HeaderComponent,
    ListErrorsComponent,
    SidenavListComponent,
    HomeComponent,
    ShowAuthedDirective,
    ListEnterpriseComponent,
    ActivateEnterpriseComponent,
    AddEnterpriseComponent,
    DeleteEnterpriseComponent,
    EditEnterpriseComponent,
    ViewEnterpriseComponent
  ],
  // exports: [
  //   ShowAuthedDirective
  // ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
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
