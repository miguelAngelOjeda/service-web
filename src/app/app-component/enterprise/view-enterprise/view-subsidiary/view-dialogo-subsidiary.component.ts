import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Enterprise, Subsidiary } from '../../../../core/models';
import { ApiService } from '../../../../core/services';
import { FormControl, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-view-dialogo-subsidiary',
  templateUrl: './view-dialogo-subsidiary.component.html',
  styleUrls: ['./view-dialogo-subsidiary.component.css']
})
export class ViewDialogoSubsidiaryComponent {
  model: Subsidiary;
  formControl = new FormControl('', [
    Validators.required
  // Validators.email,
  ]);

  constructor(public dialogRef: MatDialogRef<ViewDialogoSubsidiaryComponent>,
            @Inject(MAT_DIALOG_DATA) public data: Subsidiary) {
              this.model = data;
              console.log(data);
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Campo requerido' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }
}
