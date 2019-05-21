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
    },6000)      
  }

  getTypeToken(): string {
    return localStorage.getItem('type_token');
  }

  setTypeToken(token: string): void {
    localStorage.setItem('type_token', token);
  }

  getToken(): string {
    return localStorage.getItem('jwtToken');
  }

  setToken(token: Token) {
    this.setTypeToken(token.token_type);
    window.localStorage['jwtToken'] = token.access_token;
  }

  setUser(user: UserSession) {
    window.localStorage['user'] = JSON.stringify(user);
  }

  getUser(): UserSession {
    return JSON.parse(localStorage.getItem('user'));
  }

  setTokenUpdate(token: string) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('type_token');
    window.localStorage.removeItem('user');
  }

  destroyTokenUpdate() {
    window.localStorage.removeItem('jwtToken');
  }


}
