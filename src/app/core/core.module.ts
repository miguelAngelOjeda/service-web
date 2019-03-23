import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpTokenInterceptor } from './interceptors/http.token.interceptor';
import { JwtModule, JwtInterceptor, JWT_OPTIONS } from '@auth0/angular-jwt';

export function tokenGetter() {
  console.log(localStorage.getItem('jwtToken'));
  return localStorage.getItem('jwtToken');
  //return {
  //  tokenGetter: () => {
  //    return localStorage.getItem('jwtToken');
  //  },
  //  whitelistedDomains: ['desarrollo13.coomecipar.coop.py', 'desarrollo13.coomecipar.coop.py:8989']
  //}
  //return localStorage.getItem('jwtToken');
}


import {
  ApiService,
  AuthGuard,
  JwtService,
  UserService
} from './services';

@NgModule({
  imports: [
    CommonModule,
     JwtModule.forRoot({
       config: {
         tokenGetter: tokenGetter,
         whitelistedDomains: ['desarrollo13.coomecipar.coop.py', 'desarrollo13.coomecipar.coop.py:8989', 'localhost', 'localhost:8989']
         //blacklistedRoutes: ['example.com/examplebadroute/']
       }
     }),
     HttpClientModule
    // JwtModule.forRoot({
    //       jwtOptionsProvider: {
    //         provide: JWT_OPTIONS,
    //         useFactory: tokenGetter
    //       }
    //     })
  ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    //  JwtInterceptor,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptor,
    //   multi: true
    // },
    AuthGuard,
    JwtService,
    UserService
  ],
  declarations: []
})
export class CoreModule { }
