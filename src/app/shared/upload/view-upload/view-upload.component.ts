import { Component, OnInit, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { DeleteDialogComponent } from '../../../shared/dialog';
import { Message } from '../../../core/models';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { GalleryDialogComponent, GalleryDialogPdfComponent } from '../../../shared/dialog';
import { HttpClient } from '@angular/common/http';
import { Observable, of  } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
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
  diferenciaDias;
  public uploader: FileUploader = new FileUploader({isHTML5: true,autoUpload: false,allowedFileType: ['image', 'pdf']});

  @Input() entidad;
  @Input() idEntidad;
  @Input() codStatus;
  @Input() fechaAprobacion;

  constructor(
    private parentF: FormGroupDirective,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private http: HttpClient,
    public dialog: MatDialog
  ) {
  }

  ngOnInit() {

    if(this.fechaAprobacion){
      // Calcular la diferencia en milisegundos
      const diferenciaMilisegundos: number = new Date().getTime() - new Date(this.fechaAprobacion).getTime();
      // Convertir la diferencia de milisegundos a días
      this.diferenciaDias = diferenciaMilisegundos / (1000 * 3600 * 24);
    }

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
              staff.url = environment.api_url + '/DescargaServlet?path=' + staff.path;
            }else{
              staff.url = environment.api_url + '/DisplayImage?url=' + staff.path;
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
        //dialogConfig.width = '90%';
        //dialogConfig.autoFocus = true;
        dialogConfig.panelClass = 'mat-dialog-app-viewer';
        let dialogRef = this.dialog.open(GalleryDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          if(result){

          }
        })
      }
    });
  }

  viewUrlImageAll(){
    this.apiService.get('/archivos/' + this.entidad +'/' + this.idEntidad)
    .subscribe(res => {
      if(res.status == 200){
        let array = []
        res.rows.forEach(staff => {
          if(staff.tipoArchivo === 'application/pdf'){
            let base64 = this.viewPdf(environment.api_url + '/DescargaServlet?path=' + staff.path);
            array.push(base64);
          }else{
            array.push(environment.api_url + '/DisplayImage?url=' + staff.path);
          }
        });
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = array;
        dialogConfig.width = '70%';
        dialogConfig.autoFocus = true;
        dialogConfig.panelClass = 'mat-dialog-app-viewer';
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
        let array = []
        if(res.model.tipoArchivo === 'application/pdf'){
          let url = environment.api_url + '/DescargaServlet?path=' + res.model.path;
          this.loadViewPdf(url);
        }else{
          array.push(environment.api_url + '/DisplayImage?url=' + res.model.path);
          this.loadView(array);
        }
      }
    });
  }

  public viewPdf(url : string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' })
    map(blob => {
       return blob;
    });
  }

  public loadView(data: any){
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.width = '80%';
    //dialogConfig.height = '77%';
    dialogConfig.data = data;
    dialogConfig.panelClass = 'mat-dialog-app-viewer';
    let dialogRef = this.dialog.open(GalleryDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){

      }
    });
  }

  public loadViewPdf(url: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    dialogConfig.height = '77%';
    dialogConfig.data = url;
    dialogConfig.panelClass = 'mat-dialog-app-viewer';
    let dialogRef = this.dialog.open(GalleryDialogPdfComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){

      }
    });
  }

  uploadSubmit(index: number){
    let fileItem = (<FormControl>(<FormArray>this.uploadForm.get(this.formArrayName)).controls[index]).get("file").value;
    if(fileItem.size > 10000000){
      alert("Each File should be less than 10 MB of size.");
      return;
    }

    let dataType = (<FormArray>this.uploadForm.get(this.formArrayName)).controls[index].value;
    let document = dataType.tipoDocumento;

    var reader = new FileReader();
    reader.onload = (readerEvent) => {
      if (reader.result.toString().includes('data:application/pdf')) {
        dataType.tipoArchivo = "application/pdf";
        dataType['url_path'] = reader.result.toString();
      }else{
        dataType['url_path'] = reader.result.toString().split(',')[1];
      }
      this.saveDocument(dataType, fileItem, index);
    }
    reader.readAsDataURL(fileItem);
  }

  saveDocument(dataDocument: any, fileItem : any, index :  any){
    let data = new FormData();
    data.append('file', fileItem);
    data.append('fileSeq', 'seq'+index);
    data.append( 'dataType', JSON.stringify(dataDocument));

    this.apiService.post('/archivos/upload', data)
    .subscribe(res => {
      if(res.status == 200){
        if(res.model.tipoArchivo === 'application/pdf'){
          res.model.url =  environment.api_url + '/DescargaServlet?path=' + res.model.path;
        }else{
          res.model.url =  environment.api_url + '/DisplayImage?url=' + res.model.path;
        }
        (<FormControl>(<FormArray>this.uploadForm.get(this.formArrayName)).controls[index]).patchValue(res.model);
      }
    });
    this.uploader.clearQueue();
  }

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
  }

}
