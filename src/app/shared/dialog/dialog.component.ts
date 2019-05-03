import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import { Message } from "../../core";
import { MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Message
  ) {
    console.log(data);
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
