import { Component, OnInit, Inject, ViewChild, ElementRef  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormControl, Validators} from '@angular/forms';
import { UserService, ApiService} from '../../../core/services';
import { Users, Role, Rules, Filter, Subsidiary } from '../../../core/models';
import {merge, fromEvent,ReplaySubject, Subject, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter, take, takeUntil} from 'rxjs/operators';
import * as $ from 'jquery';
import 'dropify';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
    private model = new Users();
    disableSelectDepartment = new FormControl(true);
    hide = true;
    //Filter
    isfilter = false;
    filter = new Filter;
    rules: Array<Rules> = [];
    /** list of rules */
    protected role: Array<Role> = [];
    @ViewChild('filterInputRole') filterInputRole: ElementRef;Subsidiary
    /** list of subsidiary */
    protected subsidiary: Array<Subsidiary> = [];
    @ViewChild('filterInputSubsidiary') filterInputSubsidiary: ElementRef;

    formControl = new FormControl('', [Validators.required]);

    constructor(
      private apiService: ApiService,
    ) { }

    ngOnInit() {
      this.onInitDropify();
      this.filterRules();
      this.filterSubsidiary();
    }


    onInitDropify() {
      (<any>$('.dropify') ).dropify({
          messages: {
                  default: 'Arrastre un archivo o haga clic aquí',
                  replace: 'Arrastre un archivo o haga clic en reemplazar',
                  remove: 'Eliminar',
                  error: 'Lo sentimos, el archivo demasiado grande'
          }
      });
    }

    protected selectionChangeSubs($event) {
      console.log($event);
    }

    protected filterRules() {
      let rulesColumns  = ['nombre'];
      merge(fromEvent(this.filterInputRole.nativeElement, 'keyup'))
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isfilter = false;
              if(this.filterInputRole.nativeElement.value.length  > 3){
                this.isfilter = true;
                for (let i = 0; i < rulesColumns.length; i++)
                {
                  this.rules.push({
                          field: rulesColumns[i],
                          op: "cn",
                          data: this.filterInputRole.nativeElement.value
                      });
                }
                this.filter.groupOp = 'OR';
                this.filter.rules = this.rules;
              }
              return this.apiService.getPageList('/roles',this.isfilter,JSON.stringify(this.filter), 'desc', 'id',
              0,10);
            }),
            map(data => {
              return data.rows as Role[];;
            }),
            catchError(() => {
              return observableOf([]);
            })
          ).subscribe(data => this.role = data);
    }

    protected filterSubsidiary() {
      let rulesColumns  = ['codigoSucursal', 'nombre'];
      merge(fromEvent(this.filterInputSubsidiary.nativeElement, 'keyup'))
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isfilter = false;
              if(this.filterInputSubsidiary.nativeElement.value.length  > 3){
                this.isfilter = true;
                for (let i = 0; i < rulesColumns.length; i++)
                {
                  this.rules.push({
                          field: rulesColumns[i],
                          op: "cn",
                          data: this.filterInputSubsidiary.nativeElement.value
                      });
                }
                this.filter.groupOp = 'OR';
                this.filter.rules = this.rules;
              }
              return this.apiService.getPageList('/sucursales',this.isfilter,JSON.stringify(this.filter), 'desc', 'id',
              0,10);
            }),
            map(data => {
              return data.rows as Subsidiary[];;
            }),
            catchError(() => {
              return observableOf([]);
            })
          ).subscribe(data => this.subsidiary = data);
    }

    showpreview(event) {
      let reader = new FileReader();
      if(event.target.files && event.target.files.length > 0) {
        let file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.model.persona.avatar ={
            filename: file.name,
            filetype: file.type,
            url: reader.result,
            value: reader.result.toString().split(',')[1]
          };
        };
      }
    }

    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Campo requerido' :
        this.formControl.hasError('email') ? 'Not a valid email' :
          '';
    }


  }
