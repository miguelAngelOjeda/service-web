import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Enterprise, Subsidiary } from '../../../core/models';
import { ApiService } from '../../../core/services';
import { FormControl, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-dialogo-subsidiary',
  templateUrl: './add-dialogo-subsidiary.component.html',
  styleUrls: ['./add-dialogo-subsidiary.component.css']
})
export class AddDialogoSubsidiaryComponent {
  model: Subsidiary;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(
            public dialogRef: MatDialogRef<AddDialogoSubsidiaryComponent>,
            private apiService: ApiService,
            @Inject(MAT_DIALOG_DATA) public data: Subsidiary) {
              this.model = data;

  }

  submit(form) {
    this.apiService.post('/sucursales', this.model)
    .subscribe(res => {
        this.model = res.model as Subsidiary;
        //this.snackBarService.openSnackBar('res');

    });
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }
}
