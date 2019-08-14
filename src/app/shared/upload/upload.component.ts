import { Component, OnInit, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { DeleteDialogComponent } from '../../shared/dialog';
import { Message } from '../../core/models';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { GalleryDialogComponent } from '../../shared/dialog';
import { UserService, ApiService, FormsService} from '../../core/services';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class UploadComponent implements OnInit {
  uploadForm: FormGroup;
  formArrayName = 'documentos';
  public uploader: FileUploader = new FileUploader({
    url: 'URL',
    isHTML5: true,
    disableMultipart : false,
    autoUpload: true,
    method: 'post',
    itemAlias: 'attachment',
    allowedFileType: ['image', 'pdf']
  });

  constructor(
    private parentF: FormGroupDirective,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.uploadForm = this.parentF.form;
    this.uploadForm.addControl(this.formArrayName, this.formBuilder.array([]));
    // this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
    //   form.append('someField', 'this.someValue'); //note comma separating key and value
    //   form.append('someField2', 'this.someValue2');
    //  };
    this.uploader.onAfterAddingFile = (fileItem) => {
      console.log('selected filed: ', fileItem);
      (<FormArray>this.uploadForm.get(this.formArrayName)).push(this.addFormGroup(fileItem._file));
    };
  }

  onFileSelected($event){
    console.log($event);
    console.log(this.uploader);
    let formData = new FormData();
    formData.append("file", $event[0]);
    (<FormArray>this.uploadForm.get(this.formArrayName)).push(this.addFormGroup($event[0]));
    console.log(this.uploadForm.value);
  }

  //Agrega imagenes
  addFormGroup(file: any): FormGroup {
    return this.formBuilder.group({
      id: [''],
      file: [file],
      tipoDocumento: [null, [Validators.required]],
      activo: ['S']
    });
  }

  viewImage(file : any): void {
    let image;
    var reader = new FileReader();
    reader.onloadend = (readerEvent) => {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = reader.result.toString().split(',')[1];
      dialogConfig.width = '50%';
      let dialogRef = this.dialog.open(GalleryDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result){

        }
      })
    }
    reader.readAsDataURL(file);
  }

  delete(data: any){
    if(data.id){
      const message = new Message;
      message.titulo = "Eliminar Registro"
      message.texto = "Esta seguro que desea eliminar el registro ";

      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = message;

      let dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.apiService.delete('/documentos/' + data.id)
          .subscribe(res => {
              if(res.status == 200){
                (<FormArray>this.uploadForm.get(this.formArrayName)).removeAt((<FormArray>this.uploadForm.get(this.formArrayName)).value.findIndex(dep => dep === data))
              }
          });
        }
      })
    }else{
      (<FormArray>this.uploadForm.get(this.formArrayName)).removeAt((<FormArray>this.uploadForm.get(this.formArrayName)).value.findIndex(dep => dep === data))
    }

  }

}
