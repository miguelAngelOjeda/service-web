import { Component, OnInit, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { DeleteDialogComponent } from '../../../shared/dialog';
import { Message } from '../../../core/models';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { GalleryDialogComponent } from '../../../shared/dialog';
import { UserService, ApiService, FormsService} from '../../../core/services';

@Component({
  selector: 'app-view-upload',
  templateUrl: './view-upload.component.html',
  styleUrls: ['./view-upload.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ViewUploadComponent implements OnInit {
  uploadForm: FormGroup;
  formArrayName = 'documentos';
  public uploader: FileUploader = new FileUploader({isHTML5: true,autoUpload: false,allowedFileType: ['image', 'pdf']});

  @Input() entidad;
  @Input() idEntidad;

  constructor(
    private parentF: FormGroupDirective,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.uploadForm = this.parentF.form;
    this.uploadForm.addControl(this.formArrayName, this.formBuilder.array([]));
    this.uploader.onAfterAddingFile = (fileItem) => {
      let formUpload = this.formBuilder.group({
        id: null,
        size: fileItem._file.size,
        entidad: this.entidad,
        idEntidad: this.idEntidad,
        nombreDocumento: fileItem._file.name,
        path: null,
        file: fileItem._file,
        url: null,
        tipoArchivo: null,
        tipoDocumento: [null, [Validators.required]],
        activo: ['S']
      });
      (<FormArray>this.uploadForm.get(this.formArrayName)).push(formUpload);
    };

    this.apiService.get('/archivos/' + this.entidad +'/' + this.idEntidad)
    .subscribe(res => {
      if(res.status == 200){
        const archivos = (<FormArray>this.uploadForm.get(this.formArrayName));
        console.log(archivos);
        if(archivos){
          while (archivos.length) {
            archivos.removeAt(0);
          }
          res.rows.forEach(staff => {
            if(staff.tipoArchivo === 'application/pdf'){
              staff.url = 'https://app1.creditoguarani.com.py/beta1/DescargaServlet?path='+staff.path;
            }else{
              staff.url = 'https://app1.creditoguarani.com.py/beta1/DisplayImage?url='+staff.path;
            }
            archivos.push(this.formBuilder.group(staff));
          });
        }
      }
    });
  }

  viewImageAll(){
    this.apiService.get('/archivos/all/' + this.entidad +'/' + this.idEntidad)
    .subscribe(res => {
      if(res.status == 200){
        // console.log(images);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = res.model;
        dialogConfig.width = '50%';
        dialogConfig.autoFocus = true;
        let dialogRef = this.dialog.open(GalleryDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          if(result){

          }
        })
      }
    });
  }

  viewImageUrl(id : any): void {
    this.apiService.get('/archivos/' + id)
    .subscribe(res => {
      if(res.status == 200){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = res.model;
        dialogConfig.width = '50%';
        dialogConfig.autoFocus = true;
        let dialogRef = this.dialog.open(GalleryDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          if(result){

          }
        })
      }
    });
  }


}
