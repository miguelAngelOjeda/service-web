import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable ,  BehaviorSubject ,  ReplaySubject } from 'rxjs';
import { map ,  distinctUntilChanged } from 'rxjs/operators';

import { User } from '../models';
import { Token } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>({} as User);
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor (
    private apiService: ApiService,
    private http: HttpClient,
    private jwtService: JwtService
    ) {}
    // Verify JWT in localstorage with server & load user's info.
    // This runs once on application startup.
    populate() {
      // If JWT detected, attempt to get & store user's info
      if (this.jwtService.getToken()) {
        this.apiService.get('/user')
        .subscribe(
          data => this.setAuth(data.user, data.token),
          err => this.purgeAuth()
        );
      } else {
        // Remove any potential remnants of previous auth states
        this.purgeAuth();
      }
    }

    setAuth(user: User, tokens: Token) {
      // Save JWT sent from server in localstorage
      this.jwtService.saveToken(tokens);
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
      return this.apiService.post(route, credentials)
        .pipe(map(
        data => {
          this.setAuth(data.user, data.token);
          return data;
        }
      ));
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
