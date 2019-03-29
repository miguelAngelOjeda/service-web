import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from './jwt.service';
import { UserService } from './user.service';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private userService : UserService
  ) {}

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  getPageList(path: string, _search: boolean = false, sort: string = 'desc', sidx: string = 'id', page: number = 1, rows: number = 10, all: boolean = false): Observable<any> {
      this.userService.validateTokensSession();
      let params = new HttpParams({
        fromObject : {
          '_search' : _search.toString(),
          'page' : page.toString(),
          'rows' : rows.toString(),
          'sidx' : sidx,
          'sord' : sort,
          'all' : all.toString()
        }
      });
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    this.userService.validateTokensSession();
    return this.http.get(`${environment.api_url}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    this.userService.validateTokensSession();
    return this.http.put(
      `${environment.api_url}${path}`,
      body
    ).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: Object = {}): Observable<any> {
    this.userService.validateTokensSession();
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body)
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    this.userService.validateTokensSession();
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }


}
