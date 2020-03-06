import { Component, ViewChild, OnInit, OnChanges, Inject, SimpleChanges, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from "../../../core";
import { MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery-dialog-pdf',
  templateUrl: './gallery-dialog-pdf.component.html',
  styleUrls: ['./gallery-dialog-pdf.component.css']
})
export class GalleryDialogPdfComponent implements OnInit{
  public url_path = '';
  constructor(
    private http: HttpClient,
    public sanitizer: DomSanitizer,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<GalleryDialogPdfComponent>,
    @Inject(MAT_DIALOG_DATA) public url: any
  ) {
    this.url_path = url;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

  private downloadFile(url: string): any {
    return this.http.get(url, { responseType: 'blob' })
    .pipe(
      map((result: any) => {
        return result;
      })
    );
  }

}
