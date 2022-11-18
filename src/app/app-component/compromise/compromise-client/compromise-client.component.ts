import { Component, OnInit, Inject, ViewChild, NgZone, ElementRef  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { HttpParams } from '@angular/common/http';
import { Router, CanActivate, ActivatedRoute} from '@angular/router';
import { MatPaginator, MatTableDataSource, MatDialog,
   MatDialogConfig, MatSort, PageEvent, Sort} from '@angular/material';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { UserService, ApiService, FormsService} from '../../../core/services';
import { ErrorStateMatcher} from '@angular/material/core';
import { PeopleService } from '../../shared/people';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-compromise-client',
  templateUrl: './compromise-client.component.html',
  styleUrls: ['./compromise-client.component.scss']
})
export class CompromiseClientComponent implements OnInit {
    myForm: FormGroup;
    compromiseForm: FormGroup;
    peopleForm: FormGroup;
    urlImage = environment.api_url;

    params = new HttpParams({fromObject : {'included' : 'inmuebles,vehiculos,referencias,ingresos,egresos,ocupaciones,vinculos,egresoCreditos'}});

    public isMobile: Boolean;
    public rulesColumns  = ['nroCredito'];
    public displayedColumns = ['nroCredito','cuotas', 'monto', 'motivo' , 'fechaPago', 'opciones'];
    public dataSource = new MatTableDataSource<any>();

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild('filter', { static: true }) filterInput: ElementRef;

    //Filter
    isfilter = false;
    // MatPaginator Inputs
    length = 0;
    pageSize = 10;
    pageSizeOptions: number[] = [10, 25, 100];
    // MatPaginator Output
    pageEvent: PageEvent;

    constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private peopleService: PeopleService,
      private apiService: ApiService,
      private route: ActivatedRoute
    ) {}

    ngOnInit() {
      this.initFormBuilder();
      this.apiService.get('/clientes/' + this.route.snapshot.params.id, this.params)
      .subscribe(res => {
        if(res.status == 200){
          this.myForm.patchValue(res.model);
        }
      });
    }

    onSubmit() {
      this.apiService.post('/clientes', this.myForm.value)
      .subscribe(res => {
        if(res.status == 200){
          this.myForm.patchValue(res.model);
          this.peopleService.loadData((<FormGroup>this.myForm.get('persona')),res.model.persona);
        }
      });
    }

    protected initFormBuilder() {
      this.compromiseForm = this.formBuilder.group({
        id: null ,
        activo: 'S',
        nroCredito: null,
        cuotas: null,
        monto: null,
        motivo: null,
        fechaPago: null
      });
      this.myForm = this.formBuilder.group({
        id: null ,
        activo: 'S'
      });
      this.myForm.addControl('persona', this.formBuilder.group({
        id: null ,
        avatar: null ,
        primerNombre: null,
        segundoNombre: null,
        primerApellido: null,
        segundoApellido: null,
        documento: null,
        ruc: null,
        fechaNacimiento: null,
        sexo: null,
        numeroHijos: null,
        numeroDependientes: null,
        separacionBienes: null,
        email: null,
        telefonoParticular: null,
        direccionParticular: null,
        observacion: null,
        latitud: '',
        longitud: '',
        activo: 'S',
        imagePath: null,
        nacionalidad: null,
        profesion: null,
        pais: null,
        departamento: null,
        ciudad: null,
        barrio: null
      }));
    }

    // Get Current Location Coordinates
    getAddress(location: any): void {
      this.myForm.controls['latitud'].setValue(location.lat);
      this.myForm.controls['longitud'].setValue(location.lng);
      this.myForm.controls['direccionParticular'].setValue(location.address);
    }

    getAvatar(avatar: any): void {
      this.myForm.controls['avatar'].setValue(avatar);
    }

    getValue(data: any, form : FormControl): void {
      form.setValue(data);
    }

  }
