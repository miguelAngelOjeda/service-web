import { Component, OnInit, OnChanges, Inject, SimpleChanges } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import { Message } from "../../../core";
import { MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery-dialog',
  templateUrl: './gallery-dialog.component.html',
  styleUrls: ['./gallery-dialog.component.css']
})
export class GalleryDialogComponent{
  public images = [''];
  constructor(
    public sanitizer: DomSanitizer,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GalleryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.images = data;
  }

  close() {
    this.dialogRef.close();
  }

}
