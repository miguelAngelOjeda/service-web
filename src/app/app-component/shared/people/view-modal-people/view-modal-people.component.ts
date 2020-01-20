import { Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService, ApiService, ReviewService, PeopleService, ValidationService } from '@core/service';
import { Subsidiary, Departments, Message, Location } from '../../../../core/models';
import { DeleteDialogComponent } from '../../../../shared';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-view-modal-people',
  templateUrl: './view-modal-people.component.html',
  styleUrls: ['./view-modal-people.component.css']
})
export class ViewModalPeopleComponent implements OnInit{
  myForm: FormGroup;
  peopleForm: FormGroup;

  public people: any;
  public title: any;

  constructor(
            public dialog: MatDialog,
            private formBuilder: FormBuilder,
            private peopleService: PeopleService,
            public dialogRef: MatDialogRef<ViewModalPeopleComponent>,
            private apiService: ApiService,
            @Inject(MAT_DIALOG_DATA) public data: any) {
              this.people = data.model;
              this.title = data.title;
  }

  ngOnInit() {
    this.initFormBuilder();
    setTimeout(() => {
        this.peopleService.loadData(<FormGroup>this.myForm.get('persona'),this.people);
    });
  }


  protected initFormBuilder() {
    this.myForm = this.formBuilder.group({});
  }
}
