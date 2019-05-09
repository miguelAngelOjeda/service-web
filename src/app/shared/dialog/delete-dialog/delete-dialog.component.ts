import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import { Message } from "../../../core";
import { MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Message
  ) {}

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
