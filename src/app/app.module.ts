import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { routing }        from './app-routing.module';

//import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatMenuModule} from '@angular/material/menu';
import { MaterialModule } from './material/material.module';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AlertComponent } from './directives';
import { AuthGuard } from './guards';
import { ErrorInterceptor } from './helpers';
import { UsersComponent } from './users';
import { AlertService, AuthenticationService, UserService, ApiService, JwtService } from './services';
import { HomeComponent } from './home';
import { LayoutComponent, ShowAuthedDirective, ListErrorsComponent } from './shared';
import { HeaderComponent, SidenavListComponent } from './navigation';
import { LoginComponent } from './login';

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
    ShowAuthedDirective
  ],
  exports: [
    ShowAuthedDirective
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule,
    FlexLayoutModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        ApiService,
        JwtService,
        UserService
        //{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
        //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
