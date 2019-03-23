import { Injectable } from '@angular/core';
import { Token } from '../models';


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

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('type_token');
  }

}
