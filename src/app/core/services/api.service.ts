import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { JwtService } from './jwt.service';
import { UserService } from './user-access.service';
import { Rules, Filter } from '../models';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  filter = new Filter;
  rules: Array<Rules> = [];

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private userService : UserService
  ) {}

  private formatErrors(error: any) {
    return  throwError(error.error);
  }

  getPageList(path: string, _search: boolean = false, filters: string = null,
     rulesColumns: any = null, sort: string = 'desc', sidx: string = 'id',
   page: number = 1, rows: number = 10, all: boolean = false, fkModel: string = null): Observable<any> {
      this.userService.validateTokensSession();
      this.rules = [];
      console.log(filters);
      console.log(rulesColumns);
      if(_search){
        for (let i = 0; i < rulesColumns.length; i++)
        {
          this.rules.push({
                  field: rulesColumns[i],
                  op: "cn",
                  data: filters
              });
        }
        this.filter.groupOp = 'OR';
        this.filter.rules = this.rules;
      }
      let params = new HttpParams({
        fromObject : {
          '_search' : _search.toString(),
          'page' : page.toString(),
          'rows' : rows.toString(),
          'sidx' : sidx,
          'sord' : sort,
          'all' : all.toString(),
          'fkModel' : fkModel,
          'filters' : JSON.stringify(this.filter)
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
      body
    ).pipe(catchError(this.formatErrors));
  }

  delete(path): Observable<any> {
    this.userService.validateTokensSession();
    return this.http.delete(
      `${environment.api_url}${path}`
    ).pipe(catchError(this.formatErrors));
  }


}
