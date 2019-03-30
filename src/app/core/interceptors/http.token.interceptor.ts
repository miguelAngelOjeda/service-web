import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of  } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Token } from '../models';
import { JwtService } from '../services';
import 'rxjs/add/observable/fromPromise';
import { throwError } from 'rxjs';
import { MatSnackBarComponent } from '../mat-snack-bar/mat-snack-bar.component';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private snackBar: MatSnackBarComponent,
    private jwtService: JwtService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let res: any;
    return next.handle(request).pipe(
            tap(evt => {
              console.log(evt);
              console.log(request);
                if (evt instanceof HttpResponse) {
                    const keys = evt.headers.keys();

                    if(evt.headers.get('Update-Token') != null){
                       //jwtService.destroyTokenUpdate();
                       this.jwtService.setTokenUpdate(evt.headers.get('Update-Token'));
                    }

                    if(evt.body != null
                      && evt.body.status != 200){
                      this.snackBar.openSnackBar(evt.body.message,'Close','red-snackbar');
                    }else if(request.method != 'GET'){
                      this.snackBar.openSnackBar(evt.body.message,'Close','green-snackbar');
                    }
                }
            }),
            catchError((err: any) => {
                if(err instanceof HttpErrorResponse) {
                    try {
                          console.log(err);
                          if(err.status == 401){
                            this.snackBar.openSnackBar('Su session ha caducado','Close','red-snackbar');
                          }else if(err.status == 0){
                            this.snackBar.openSnackBar('Error al conectar con el servidor, si el problema persiste contactar con el administrador.','Close','red-snackbar');
                            this.jwtService.destroyToken();
                            setTimeout(() => {
                              this.router.navigateByUrl('service-web/login');
                            }, 7000);
                          }else{
                            this.snackBar.openSnackBar(err.status + ' ' + err.message,'Close','red-snackbar');
                          }
                    } catch(e) {
                          this.snackBar.openSnackBar('Error no determinado','Close','red-snackbar');
                    }
                    //log error
                }
                return of(err);
            }));
  }


}
