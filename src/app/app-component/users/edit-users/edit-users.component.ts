import { Component, OnInit, Inject, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSelect} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , ActivatedRoute} from '@angular/router';
import { UserService, ApiService} from '../../../core/services';
import { Users, Role, Rules, Filter, Subsidiary, Departments } from '../../../core/models';
import {merge, fromEvent,ReplaySubject, Subject, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, filter, take, takeUntil} from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import * as $ from 'jquery';
import 'dropify';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit, AfterViewInit, OnDestroy  {
  private model = new Users();
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
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.onInitDropify();
    this.filterRules();
    this.filterSubsidiary();
    this.apiService.get('/usuarios/' + this.route.snapshot.params.id)
    .subscribe(res => {
       this.model = res.model as Users;
       this.model.persona.fechaNacimiento =  new Date(this.model.persona.fechaNacimiento);
       this.filterDepartments();
    });

  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  submit() {
    this.apiService.put('/usuarios/' + this.route.snapshot.params.id, this.model)
    .subscribe(res => {

    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.model.persona.avatar ={
          filename: file.name,
          filetype: file.type,
          value: reader.result.toString().split(',')[1]
        };
      };
    }
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

  resetDropify() {
    if(this.model.persona.imagePath != null){
      let drEvent = (<any>$('.dropify') ).data('dropify');
      drEvent.resetPreview();
      drEvent.clearElement();
      drEvent.settings.defaultFile = environment.api_url +"/DisplayImage?url=" + this.model.persona.imagePath;
      drEvent.destroy();
      drEvent.init();
    }
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

  protected filterDepartments() {
    if(this.model.persona.sucursal.id != null){
      this.apiService.getPageList('/sucursales/' + this.model.persona.sucursal.id +'/departamentos',false,null, null, 'desc', 'id',
      0,10)
      .subscribe(res => {
         this.departments = res.rows as Departments[];
      });
    }
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
            return data.rows as Subsidiary[];
          }),
          catchError(() => {
            return observableOf([]);
          })
        ).subscribe(data => this.subsidiary = data);
  }

  compareObjects(o1: any, o2: any): boolean {
    return  o1.id === Number(o2.id);
  }


  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }





}
