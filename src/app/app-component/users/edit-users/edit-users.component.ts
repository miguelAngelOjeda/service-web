import { Component, OnInit, Inject, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSelect} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot , ActivatedRoute} from '@angular/router';
import { UserService, ApiService} from '../../../core/services';
import { Users, Role, Rules, Filter, Subsidiary } from '../../../core/models';
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
  filter = new Filter;
  rules: Array<Rules> = [];
  /** list of rules */
  protected role: Array<Role> = [];
  @ViewChild('filterInputRole') filterInputRole: ElementRef;
  /** list of subsidiary */
  protected subsidiary: Array<Subsidiary> = [];
  @ViewChild('filterInputSubsidiary') filterInputSubsidiary: ElementRef;

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
    });

  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
  }

  submit() {
    console.log(this.model);
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


  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }





}
