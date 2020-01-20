import { Component, OnInit } from '@angular/core';
import { Router, CanActivate, ActivatedRoute} from '@angular/router';
import { UserService, ApiService, ReviewService, PeopleService } from '@core/service';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators} from '@angular/forms';
import { ViewModalPeopleComponent } from '../../../shared/people';
import { MatDialog, PageEvent, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-view-check-review',
  templateUrl: './view-check-review.component.html',
  styleUrls: ['./view-check-review.component.scss']
})
export class ViewCheckReviewComponent implements OnInit {
  myForm: FormGroup;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private peopleService: PeopleService,
    private reviewService: ReviewService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.myForm = this.reviewService.initFormBuilder();
    this.apiService.get('/analisis_solicitudes/analizar/' + this.route.snapshot.params.id)
    .subscribe(res => {
      if(res.status == 200){
        this.myForm.patchValue(res.model);
        //Cargar Ocupaciones
        if(res.model.detalles != null &&  res.model.detalles.length > 0){
          const detalles = (<FormArray>this.myForm.get('detalles'));
          if(detalles){
            while (detalles.length) {
              detalles.removeAt(0);
            }
            res.model.detalles.forEach(staff => {
              let form = this.formBuilder.group(staff);
              this.reviewService.valueChanges(form);
              detalles.push(form);
            });
            //this.valueChanges();
          }
        }
      }
    });
  }

}
