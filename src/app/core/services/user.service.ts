import { Injectable } from '@angular/core';
import { HttpClient,  HttpParams } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject, throwError } from 'rxjs';
import { map ,  distinctUntilChanged, catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models';
import { Token } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor (
    private apiService: ApiService,
    private router: Router,
    private http: HttpClient,
    private jwtService: JwtService
    ) {}
    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    populate() {
      // If JWT detected, attempt to get & store user's info
      if (this.jwtService.getToken()) {
        this.get('/tokens_user')
        .subscribe(
          data => this.setAuth(data.user, data.token),
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
      return this.apiService.post(route, credentials)
        .pipe(map(
        data => {
          this.setAuth(data.user, data.token);
          console.log(data);
          return data;
        }
      ));
    }

    private formatErrors(error: any) {
      return  throwError(error.error);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {

      return this.http.get<any>('http://localhost:8989/beta1' + path);
      // return this.http.get(`${environment.api_url}${path}`, { params })
      //   .pipe(catchError(this.formatErrors));
    }

    getCurrentUser(): User {
      return this.currentUserSubject.value;
    }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    getById(id: number) {
        return this.http.get(`/users/` + id);
    }

    register(user: User) {
        return this.http.post(`/users/register`, user);
    }

    update(user: User) {
        return this.http.put(`/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/` + id);
    }
}
