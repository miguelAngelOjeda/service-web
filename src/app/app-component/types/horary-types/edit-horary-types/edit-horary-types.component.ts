import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray , FormControl, FormBuilder,
   Validators, NgForm, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Message } from '../../../../core/models';
import { ApiService } from '@core/service';
import { DeleteDialogComponent } from '../../../../shared';

@Component({
  selector: 'app-edit-horary-types',
  templateUrl: './edit-horary-types.component.html',
  styleUrls: ['./edit-horary-types.component.scss']
})
export class EditHoraryTypesComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.apiService.get('/tipos-estudios/' + this.route.snapshot.params.id)
    .subscribe(res => {
    });

  }


  onSubmit() {

  }

}
