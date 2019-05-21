import { Component, OnInit, Inject, ViewChild, ElementRef  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormControl, Validators} from '@angular/forms';
import { UserService, ApiService} from '../../../core/services';
import { Users, Role, Rules, Filter, Subsidiary, Departments } from '../../../core/models';
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
    /** list of rules */
    protected role: Array<Role> = [];
    @ViewChild('filterInputRole') filterInputRole: ElementRef;
    /** list of subsidiary */
    protected subsidiary: Array<Subsidiary> = [];
    @ViewChild('filterInputSubsidiary') filterInputSubsidiary: ElementRef;
    protected departments: Array<Departments> = [];

    formControl = new FormControl('', [Validators.required]);

    constructor(
      private apiService: ApiService,
    ) { }

    ngOnInit() {
      this.onInitDropify();
      this.filterRules();
      this.filterSubsidiary();
    }

    submit() {
      this.apiService.post('/usuarios/', this.model)
      .subscribe(res => {

      });
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

    protected filterRules() {
      let rulesColumns  = ['nombre'];
      merge(fromEvent(this.filterInputRole.nativeElement, 'keyup'))
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isfilter = false;
              if(this.filterInputRole.nativeElement.value.length  > 3){
                this.isfilter = true;
              }
              return this.apiService.getPageList('/roles',this.isfilter,this.filterInputRole.nativeElement.value, rulesColumns, 'desc', 'id',
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
              }
              return this.apiService.getPageList('/sucursales',this.isfilter,this.filterInputSubsidiary.nativeElement.value, rulesColumns, 'desc', 'id',
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

    protected filterDepartments() {
      if(this.model.persona.sucursal.id != null){
        this.apiService.getPageList('/sucursales/' + this.model.persona.sucursal.id +'/departamentos',false,null,null, 'desc', 'id',
        0,10)
        .subscribe(res => {
           this.departments = res.rows as Departments[];
        });
      }
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
