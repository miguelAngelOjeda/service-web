import { Component, OnInit, Inject, ViewChild, ElementRef  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { FormControl, Validators} from '@angular/forms';
import { UserService, ApiService} from '../../../core/services';
import { Users, Role, Rules, Filter, Countries, DepartmentsCountri, Cities,
   Subsidiary, Departments, Nationalities } from '../../../core/models';
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
    /** list of Nationalities */
    protected nationalities: Array<Nationalities> = [];
    @ViewChild('filterInputNationaliti') filterInputNationaliti: ElementRef;
    /** list of Countries */
    protected countries: Array<Countries> = [];
    @ViewChild('filterInputCountries') filterInputCountries: ElementRef;
    /** list of DepartmentsCountri */
    protected departmentsCountri: Array<DepartmentsCountri> = [];
    @ViewChild('filterInputDepartmentsCountri') filterInputDepartmentsCountri: ElementRef;
    /** list of DepartmentsCountri */
    protected cities: Array<Cities> = [];
    @ViewChild('filterInputCities') filterInputCities: ElementRef;
    protected departments: Array<Departments> = [];

    formControl = new FormControl('', [Validators.required]);

    constructor(
      private apiService: ApiService,
    ) { }

    ngOnInit() {
      this.onInitDropify();
      this.filterRules();
      this.filterCountries();
      this.filterSubsidiary();
      this.filterDepartments();
      this.filterNationalities();
      this.filterDepartmentsCountri();
      this.filterCities();
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

    protected filterNationalities() {
      let rulesColumns  = ['codigo', 'nombre'];
      merge(fromEvent(this.filterInputNationaliti.nativeElement, 'keyup'))
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isfilter = false;
              if(this.filterInputNationaliti.nativeElement.value.length  > 3){
                this.isfilter = true;
              }
              return this.apiService.getPageList('/nacionalidades',this.isfilter,this.filterInputNationaliti.nativeElement.value, rulesColumns, 'desc', 'nombre',
              0,50);
            }),
            map(data => {
              return data.rows as Nationalities[];
            }),
            catchError(() => {
              return observableOf([]);
            })
          ).subscribe(data => this.nationalities = data);
    }

    protected filterCountries() {
      let rulesColumns  = ['nombre'];
      merge(fromEvent(this.filterInputCountries.nativeElement, 'keyup'))
          .pipe(
            startWith({}),
            switchMap(() => {
              this.isfilter = false;
              if(this.filterInputCountries.nativeElement.value.length  > 3){
                this.isfilter = true;
              }
              return this.apiService.getPageList('/paises',this.isfilter,this.filterInputCountries.nativeElement.value, rulesColumns, 'desc', 'nombre',
              0,50);
            }),
            map(data => {
              return data.rows as Countries[];
            }),
            catchError(() => {
              return observableOf([]);
            })
          ).subscribe(data => this.countries = data);
    }

    protected filterDepartmentsCountri() {
      let rulesColumns  = ['nombre'];
        merge(fromEvent(this.filterInputDepartmentsCountri.nativeElement, 'keyup'))
            .pipe(
              startWith({}),
              switchMap(() => {
                this.isfilter = false;
                if(this.filterInputDepartmentsCountri.nativeElement.value.length  > 3){
                  this.isfilter = true;
                }
                return this.apiService.getPageList('/departamentos/'+ this.model.persona.pais.id + '/pais',this.isfilter,this.filterInputDepartmentsCountri.nativeElement.value, rulesColumns, 'desc', 'nombre',
                0,50);
              }),
              map(data => {
                return data.rows as DepartmentsCountri[];
              }),
              catchError(() => {
                return observableOf([]);
              })
            ).subscribe(data => this.departmentsCountri = data);
    }

    protected filterCities() {
      let rulesColumns  = ['nombre'];      
        merge(fromEvent(this.filterInputCities.nativeElement, 'keyup'))
            .pipe(
              startWith({}),
              switchMap(() => {
                this.isfilter = false;
                if(this.filterInputCities.nativeElement.value.length  > 3){
                  this.isfilter = true;
                }
                return this.apiService.getPageList('/ciudades/'+ this.model.persona.departamento.id + '/departamento',this.isfilter,this.filterInputCities.nativeElement.value, rulesColumns, 'desc', 'nombre',
                0,50);
              }),
              map(data => {
                return data.rows as Cities[];
              }),
              catchError(() => {
                return observableOf([]);
              })
            ).subscribe(data => this.cities = data);
    }

    getErrorMessage() {
      return this.formControl.hasError('required') ? 'Campo requerido' :
        this.formControl.hasError('email') ? 'Not a valid email' :
          '';
    }


  }
