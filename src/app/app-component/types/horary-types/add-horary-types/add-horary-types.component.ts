import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Message } from '../../../../core/models';
import { ApiService } from '@core/service';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { DeleteDialogComponent } from '../../../../shared';

@Component({
  selector: 'app-add-horary-types',
  templateUrl: './add-horary-types.component.html',
  styleUrls: ['./add-horary-types.component.scss']
})
export class AddHoraryTypesComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService
  ) {
   }

  ngOnInit() {
  }

  onSubmit() {

  }

}
