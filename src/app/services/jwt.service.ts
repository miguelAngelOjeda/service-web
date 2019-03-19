import { Injectable } from '@angular/core';
import { Token } from '../models';


@Injectable()
export class JwtService {

  getToken(): Token {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: Token) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

}
