import { Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../../core/services/validation.service';
import { Subsidiary, Departments, Message, Location } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import { DeleteDialogComponent } from '../../../../shared';
import { PeopleService } from '../people.service';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-add-modal-people',
  templateUrl: './add-modal-people.component.html',
  styleUrls: ['./add-modal-people.component.css']
})
export class AddModalPeopleComponent implements OnInit{
  style = "max-height: 75vh";
  myForm: FormGroup;
  peopleForm: FormGroup;

  public peopleRelations: any;
  public title: any;
  public addSpouse = false;

  constructor(
            public dialog: MatDialog,
            private formBuilder: FormBuilder,
            private peopleService: PeopleService,
            public dialogRef: MatDialogRef<AddModalPeopleComponent>,
            private apiService: ApiService,
            @Inject(MAT_DIALOG_DATA) public data: any) {
              this.title = data.title;
              if(data.addSpouse){
                this.addSpouse = data.addSpouse;
              }
            }

  ngOnInit() {
    this.initFormBuilder();
  }

  onSubmit() {
    if(this.myForm.value.persona.tipoPersona !== 'FISICA'){
      this.myForm.value.persona.documento = ' ';
      this.myForm.value.persona.fechaNacimiento = new Date();
      this.myForm.value.persona.primerApellido = ' ';
      this.myForm.value.persona.estadoCivil = ' ';
      this.myForm.value.persona.sexo = 'N';
    }

    if(this.myForm.value.persona.id !== null){
      this.apiService.put('/personas/' + this.myForm.value.persona.id, this.myForm.value.persona)
      .subscribe(res => {
        if(res.status == 200){
          this.dialogRef.close(res.model);
        }
      });
    }else{
      this.apiService.post('/personas/' , this.myForm.value.persona)
      .subscribe(res => {
        if(res.status == 200){
          this.dialogRef.close(res.model);
        }
      });
    }


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