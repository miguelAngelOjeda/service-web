import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Token } from '../models';
import { JwtService } from '../services';
import 'rxjs/add/observable/fromPromise';
import { throwError } from 'rxjs';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
  private APIToken = null;
  private defaultApplicationHeaders = {
      'Content-Type': 'application/json'
  }

  buildRequestHeaders():HttpHeaders {

      let headers = this.defaultApplicationHeaders;

      // set API-Token if available
      if(this.APIToken !== null) {
          let authHeaderTpl = `Bearer ${this.APIToken}`;
          headers['Authorization'] = authHeaderTpl
      }

      return new HttpHeaders(headers);
  }

  constructor(private jwtService: JwtService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let promise = this.jwtService.getToken();


              let clonedReq = this.addToken(request, promise);
              return next.handle(clonedReq).pipe(
                  catchError(error => {
                      // Perhaps display an error for specific status codes here already?
                      let msg = error.message;



                      // Pass the error to the caller of the function
                      return throwError(error);
                  })
              );

      // const token = this.jwtService.getToken();
      // console.log('TOKEN -> ', token)
      // let clone: HttpRequest<any>;
      // if (token) {
      //
      //   //const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + token);
      //   request.headers.append('Authorization', 'Bearer ' + token);
      //   //request = request.clone({ headers: headers);
      //   console.log(request.headers);
      // }
      // request.clone({ headers:this._addStandardHeaders(request.headers)});
      // return next.handle(request);


  }

  // Adds the token to your headers if it exists
    private addToken(request: HttpRequest<any>, token: any) {
        if (token) {
            let clone: HttpRequest<any>;
            clone = request.clone({
                setHeaders: {
                    Accept: `application/json`,
                    'Content-Type': `application/json`,
                    Authorization: `Bearer ${token}`
                }
            });
            return clone;
        }

        return request;
    }


}
