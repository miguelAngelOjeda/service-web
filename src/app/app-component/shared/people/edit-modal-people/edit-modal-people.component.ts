import { Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ValidationService } from '../../../../core/services/validation.service';
import { Subsidiary, Departments, Message, Location } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import { DeleteDialogComponent } from '../../../../shared';
import { PeopleService } from '../../people/people.service';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-modal-people',
  templateUrl: './edit-modal-people.component.html',
  styleUrls: ['./edit-modal-people.component.css']
})
export class EditModalPeopleComponent implements OnInit{
  params = new HttpParams({fromObject : {'included' : 'inmuebles,vehiculos,referencias,ingresos,egresos,ocupaciones'}});
  myForm: FormGroup;
  peopleForm: FormGroup;

  public people: any;
  public title: any;
  public addSpouse = false;
  public id;

  constructor(
            public dialog: MatDialog,
            private formBuilder: FormBuilder,
            private peopleService: PeopleService,
            public dialogRef: MatDialogRef<EditModalPeopleComponent>,
            private apiService: ApiService,
            @Inject(MAT_DIALOG_DATA) public data: any) {
              this.people = data.model;
              this.title = data.title;
              this.id = data.id;
              if(data.addSpouse){
                this.addSpouse = data.addSpouse;
              }
  }

  ngOnInit() {
    this.initFormBuilder();
    setTimeout(() => {
      this.peopleService.loadData(<FormGroup>this.myForm.get('persona'),this.people);
      (<FormGroup>this.myForm.get('persona')).controls['tipoPersona'].disable({onlySelf: true});
      (<FormGroup>this.myForm.get('persona')).controls['documento'].disable({onlySelf: true});
      (<FormGroup>this.myForm.get('persona')).controls['ruc'].disable({onlySelf: true});
    });
  }

  onSubmit() {
    this.myForm.value.persona.documento = this.people.documento;
    this.myForm.value.persona.ruc = this.people.ruc;
    this.myForm.value.persona.tipoPersona = this.people.tipoPersona;
    this.peopleService.editar(this.id, this.myForm, this.dialogRef);
  }

  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({});
  }

  // Get Current Location Coordinates
  getAddress(location: Location): void {
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
