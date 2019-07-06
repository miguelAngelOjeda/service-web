import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import { Message } from "../../../core";
import { MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material";

@Component({
  selector: 'app-gallery-dialog',
  templateUrl: './gallery-dialog.component.html',
  styleUrls: ['./gallery-dialog.component.css']
})
export class GalleryDialogComponent implements OnInit{
  public imagesList = [];
  public images = ['iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=='];
  constructor(
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<GalleryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.imagesList = data;
  }

  ngOnInit() {
    this.imagesList.forEach(item=> {
      this.images.push(item)
    });
  }

  close() {
    this.dialogRef.close();
  }

}
