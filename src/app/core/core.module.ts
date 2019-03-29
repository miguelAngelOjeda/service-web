import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { JwtModule, JwtInterceptor, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MatSnackBarComponent } from './mat-snack-bar/mat-snack-bar.component';
import {
  ApiService,
  AuthGuard,
  JwtService,
  UserService
} from './services';

export function tokenGetter() {
  return localStorage.getItem('jwtToken');
}

@NgModule({
  imports: [
    CommonModule,
     JwtModule.forRoot({
       config: {
         tokenGetter: tokenGetter,
         whitelistedDomains: ['desarrollo13.coomecipar.coop.py', 'desarrollo13.coomecipar.coop.py:8989', 'localhost', 'localhost:8989'],
         //blacklistedRoutes: ['example.com/examplebadroute/']
         authScheme: 'X-Token '
       }
     }),
     HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    MatSnackBarComponent,
    AuthGuard,
    JwtService,
    UserService
  ],
  declarations: [MatSnackBarComponent]
})
export class CoreModule { }
