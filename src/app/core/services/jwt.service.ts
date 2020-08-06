import { Injectable } from '@angular/core';
import { Token, UserSession } from '../models';
import { Subject } from 'rxjs';

@Injectable()
export class JwtService {
  isLoading = new Subject<boolean>();

  show() {
      this.isLoading.next(true);
  }

  hide() {
    setInterval(() => {
      this.isLoading.next(false);
    },3000)
  }

  getTypeToken(): string {
    return window.localStorage.getItem('type_token') == null ? window.sessionStorage.getItem('type_token') : window.localStorage.getItem('type_token');
  }

  setTypeToken(token: string): void {
    window.sessionStorage.setItem('type_token', token);
    window.localStorage.setItem('type_token', token);
  }

  getToken(): string {
    return window.localStorage.getItem('jwtToken') == null ? window.sessionStorage.getItem('jwtToken') : window.localStorage.getItem('jwtToken');
  }

  setToken(token: Token) {
    this.setTypeToken(token.token_type);
    window.sessionStorage.setItem('jwtToken', token.access_token);
    window.localStorage['jwtToken'] = token.access_token;
  }

  setUser(user: UserSession) {
    window.sessionStorage.setItem('user', JSON.stringify(user));
    window.localStorage['user'] = JSON.stringify(user);
  }

  getUser(): UserSession {
    return localStorage.getItem('user') == null ? JSON.parse(sessionStorage.getItem('user')) : JSON.parse(localStorage.getItem('user'));
  }

  setTokenUpdate(token: string) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('type_token');
    window.localStorage.removeItem('user');
    window.sessionStorage.removeItem('jwtToken');
    window.sessionStorage.removeItem('type_token');
    window.sessionStorage.removeItem('user');
  }

  destroyTokenUpdate() {
    window.localStorage.removeItem('jwtToken');
    window.sessionStorage.removeItem('jwtToken');
  }


}
