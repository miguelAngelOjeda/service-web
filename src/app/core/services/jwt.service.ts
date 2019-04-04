import { Injectable } from '@angular/core';
import { Token, User } from '../models';


@Injectable()
export class JwtService {


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

  setUser(user: User) {
    window.localStorage['user'] = JSON.stringify(user);
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  setTokenUpdate(token: string) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('type_token');
  }

  destroyTokenUpdate() {
    window.localStorage.removeItem('jwtToken');
  }


}
