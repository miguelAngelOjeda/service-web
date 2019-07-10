import { Component, OnInit, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { GalleryDialogComponent } from '../../shared/dialog';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({
    url: 'URL',
    isHTML5: true,
    disableMultipart : false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['image', 'pdf']
  });

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('someField', 'this.someValue'); //note comma separating key and value
      form.append('someField2', 'this.someValue2');
     };
  }

  onFileSelected($event){
    console.log($event);
  }

  viewImage(file : any): void {
    let image;
    var reader = new FileReader();
    reader.onloadend = (readerEvent) => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = reader.result.toString().split(',')[1];
      dialogConfig.minWidth = '50%';
      let dialogRef = this.dialog.open(GalleryDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result){

        }
      })
    }
    reader.readAsDataURL(file);
  }

}
