import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Enterprise, Subsidiary } from '../../../core/models';
import { ApiService } from '../../../core/services';
import { FormControl, Validators} from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatDialog, MatSort, PageEvent,
   Sort, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialogo-subsidiary',
  templateUrl: './dialogo-subsidiary.component.html',
  styleUrls: ['./dialogo-subsidiary.component.css']
})
export class DialogoSubsidiaryComponent {

  constructor(public dialogRef: MatDialogRef<DialogoSubsidiaryComponent>,
            @Inject(MAT_DIALOG_DATA) public data: Subsidiary) {


  }
}
