import { Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../../../../core/services/validation.service';
import { Subsidiary, Departments, Message, Location } from '../../../../core/models';
import { DeleteDialogComponent } from '../../../../shared';
import { UserService, ApiService, ReviewService, PeopleService } from '@core/service';
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
    this.peopleService.guardar(this.myForm, this.dialogRef);
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
