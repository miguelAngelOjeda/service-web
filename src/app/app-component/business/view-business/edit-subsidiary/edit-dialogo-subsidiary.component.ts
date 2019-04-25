import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subsidiary } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import { FormControl, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-dialogo-subsidiary',
  templateUrl: './edit-dialogo-subsidiary.component.html',
  styleUrls: ['./edit-dialogo-subsidiary.component.css']
})
export class EditDialogoSubsidiaryComponent {
  model: Subsidiary;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(
            public dialogRef: MatDialogRef<EditDialogoSubsidiaryComponent>,
            private apiService: ApiService,
            @Inject(MAT_DIALOG_DATA) public data: Subsidiary) {
              this.model = data;
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit(form) {
    this.apiService.put('/sucursales/' + this.model.id, this.model)
    .subscribe(res => {
        //this.snackBarService.openSnackBar('res');

    });
  }
}
