import { Injectable } from '@angular/core';
import { HttpClient,  HttpParams } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject, throwError} from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { map ,  distinctUntilChanged, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../models';
import { Token } from '../models';
import { JwtService } from './jwt.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment, authorities } from '../../../environments/environment';

@Injectable()
export class UserService implements CanActivate {
    private readonly WORKFLOW_EVENTS = authorities['role'];
    private userRoles: Set<string>;

    public currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor (
    private router: Router,
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private jwtService: JwtService
    ) {}

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean> {
      let isAnth : boolean;
      this.checkAuthorization(route.data.roles)
          .subscribe(authorized => {
            if (!authorized) {
              this.router.navigateByUrl('service-web/home');
            }
            isAnth = authorized;
          });

      return Observable.of(isAnth);

      this.router.navigate(['service-web/login'], { queryParams: { returnUrl: state.url }});
      return Observable.of(false);
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
              this.setAuth(data.model['usuario'] as User, data.model['token'])
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
      // Save JWT, User sent from server in localstorage
      this.jwtService.setToken(tokens);
      this.jwtService.setUser(user);
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
          this.setAuth(data.model['usuario'] as User, data.model['token']);
          return data;
        }
      ));
    }

    public getUser(): Observable<User> {
      console.log('this.isAuthenticatedSubject.asObservable()',this.isAuthenticatedSubject.asObservable());
      if (!this.isAuthenticatedSubject.asObservable()) {
        this.populate();
      }
      return this.currentUserSubject.asObservable();
    }

    private doCheckAuthorization(path: string[]): boolean {
      if (path.length) {
        const entry = this.findEntry(this.WORKFLOW_EVENTS, path);
        if (entry && entry['permittedRoles']
               && this.userRoles.size) {
          return entry.permittedRoles
          .some(permittedRole => this.userRoles.has(permittedRole));
        }
        return false;
      }
      return false;
    }

    public checkAuthorization(path: any): Observable<boolean> {
      // we are loading the roles only once
     if (!this.userRoles) {
        return this.getUser()
          .map(currentUser => {
              if(currentUser && (Object.keys(currentUser).length === 0)){
                return this.jwtService.getUser().authorities;
              }else{
                 return currentUser.authorities;
              }
          })
          .do(authorities => {
            const rol = authorities.map(role => {
              if( typeof role.authority === 'undefined' ){
                return role.role;
              }else{
                return role.authority;
              }
            });
            this.userRoles = new Set(rol);
          })
          .map(roles => this.doCheckAuthorization(path));
      }
      return Observable.of(this.doCheckAuthorization(path));
    }
    /**
     * Recursively find workflow-map entry based on the path strings
     */
    private findEntry(currentObject: any, keys: string[], index = 0) {
        const key = keys[index];
        if (currentObject[key] && index < keys.length - 1) {
          return this.findEntry(currentObject[key], keys, index + 1);
        } else if (currentObject[key] && index === keys.length - 1) {
          return currentObject[key];
        } else {
          return false;
        }
    }

    private formatErrors(error: any) {
      return  throwError(error.error);
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
