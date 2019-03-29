import { Injectable } from '@angular/core';
import { HttpClient,  HttpParams } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject, throwError } from 'rxjs';
import { map ,  distinctUntilChanged, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models';
import { Token } from '../models';
import { JwtService } from './jwt.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor (
    private router: Router,
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private jwtService: JwtService
    ) {}

    private formatErrors(error: any) {
      return  throwError(error.error);
    }

    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    populate() {
      // If JWT detected, attempt to get & store user's info
      if (this.jwtService.getToken()) {
        this.validateTokensSession();
        this.get('/tokens_user')
        .subscribe(
          data =>{
            if(data.status == 200){
              this.setAuth(data.model['usuario'], data.model['token'])
            }

          },
          err => {
            this.purgeAuth();
            this.router.navigateByUrl('service-web/login');
          }
        );
      } else {
        // Remove any potential remnants of previous auth states
        this.purgeAuth();
        this.router.navigateByUrl('service-web/login');
      }
    }

    setAuth(user: User, tokens: Token) {
      // Save JWT sent from server in localstorage
      this.jwtService.setToken(tokens);
      // Set current user data into observable
      this.currentUserSubject.next(user);
      // Set isAuthenticated to true
      this.isAuthenticatedSubject.next(true);
    }

    purgeAuth() {
      // Remove JWT from localstorage
      this.jwtService.destroyToken();
      // Set current user to an empty object
      this.currentUserSubject.next({} as User);
      // Set auth status to false
      this.isAuthenticatedSubject.next(false);
    }

    attemptAuth(type, credentials): Observable<User> {
      const route = (type === 'login') ? '/login' : '';
      console.log(credentials);
      return this.post(route, credentials)
        .pipe(map(
        data => {
          this.setAuth(data.user, data.token);
          console.log(data);
          return data;
        }
      ));
    }

    validateTokensSession(){
      console.log(this.jwtHelper.getTokenExpirationDate());
      console.log(this.jwtHelper.isTokenExpired());
      if(this.jwtHelper.isTokenExpired()){
        //Retornar un mensaje de que su session expiro
        this.purgeAuth();
        this.router.navigateByUrl('service-web/login');
      }
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
      this.validateTokensSession();
      return this.http.get(`${environment.api_url}${path}`, { params })
        .pipe(catchError(this.formatErrors));
    }

    post(path: string, body: Object = {}): Observable<any> {
      return this.http.post(
        `${environment.api_url}${path}`,
        JSON.stringify(body)
      ).pipe(catchError(this.formatErrors));
    }

}
