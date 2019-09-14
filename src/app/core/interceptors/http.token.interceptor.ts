import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of  } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Token } from '../models';
import { JwtService } from '../services';
import 'rxjs/add/observable/fromPromise';
import { throwError } from 'rxjs';
import { finalize } from "rxjs/operators";
import { SnackbarService } from '../../shared/snackbar';
import { MatSnackBarComponent } from '../mat-snack-bar';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {

  constructor(
    private snackbarService: SnackbarService,
    private snackbar: MatSnackBarComponent,
    private router: Router,
    private jwtService: JwtService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let res: any;
    this.jwtService.show();
    return next.handle(request).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    const keys = evt.headers.keys();
                    if(evt.headers.get('Update-Token') != null){
                       //jwtService.destroyTokenUpdate();
                       this.jwtService.setTokenUpdate(evt.headers.get('Update-Token'));
                    }

                    if(evt.body != null
                      && evt.body.status != 200){
                        this.snackbar.openSnackBar(evt.body.message,'Close','red-snackbar');
                    }else if(request.method != 'GET'){
                        this.snackbar.openSnackBar(evt.body.message,'Close','green-snackbar');
                    }
                }
            }),
            catchError((err: any) => {
                if(err instanceof HttpErrorResponse) {
                    try {
                          if(err.status == 0){
                            this.snackbarService.show('Error al conectar con el servidor, si el problema persiste contactar con el administrador.','danger');
                            //this.jwtService.destroyToken();
                            //setTimeout(() => {
                              //this.router.navigateByUrl('service-web/login');
                            //}, 7000);
                          }else if(err.status != 401){
                            this.snackbarService.show(err.status + ' ' + err.message,'danger');
                          }
                    } catch(e) {
                          this.snackbarService.show('Error no determinado','danger');
                    }
                    //log error
                }
                return throwError(err);
            }),
            finalize(() => this.jwtService.hide())
          );
  }


}
