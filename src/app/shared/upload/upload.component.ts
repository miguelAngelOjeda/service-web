import { Component, OnInit, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { environment } from '../../../environments/environment';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { DeleteDialogComponent } from '../../shared/dialog';
import { Message } from '../../core/models';
import { HttpClient } from '@angular/common/http';
import { Observable, of  } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { GalleryDialogComponent, GalleryDialogPdfComponent } from '../../shared/dialog';
import { ProcessModalComponent } from '../../shared/upload/process-modal';
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
  formArrayNamePeople = 'documentosPersona';
  public uploader: FileUploader = new FileUploader({isHTML5: true,autoUpload: false,allowedFileType: ['image', 'pdf']});

  @Input() entidad;
  @Input() idEntidad;
  @Input() documento;
  @Output() arrayUpload = new EventEmitter<FormArray>();

  constructor(
    private parentF: FormGroupDirective,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private http: HttpClient,
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
        documentoPersona: this.documento,
        nombreDocumento: fileItem._file.name,
        path: null,
        file: fileItem._file,
        url: null,
        tipoArchivo: null,
        fechaVencimiento: null,
        tipoDocumento: [null, [Validators.required]],
        activo: ['S']
      });
      (<FormArray>this.uploadForm.get(this.formArrayName)).push(formUpload);
    };

    this.apiService.get('/archivos/' + this.entidad +'/' + this.idEntidad)
    .subscribe(res => {
      if(res.status == 200){
        const archivos = (<FormArray>this.uploadForm.get(this.formArrayName));
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

  cargarDocumentosPersona(){
    this.apiService.get('/archivos/propuesta/' + this.entidad +'/' + this.idEntidad +'/' + this.documento)
    .subscribe(res => {
      if(res.status == 200){
        const archivos = this.formBuilder.group({
          entidad: this.entidad,
          idEntidad: this.idEntidad,
          documentos: this.formBuilder.array([]),         
        });
        res.rows.forEach(staff => {
          if(staff.tipoArchivo === 'application/pdf'){
            staff.url = environment.api_url + '/DescargaServlet?path=' + staff.path;
          }else{
            staff.url = environment.api_url + '/DisplayImage?url=' + staff.path;
          }
          (<FormArray>archivos.get("documentos")).push(this.formBuilder.group(staff));
        });

        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '98%';
        dialogConfig.height = '77%';
        dialogConfig.data = archivos;
        dialogConfig.panelClass = 'mat-dialog-app-viewer';
        let dialogRef = this.dialog.open(ProcessModalComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
          console.log("jgjkggkj");
            this.apiService.get('/archivos/' + this.entidad +'/' + this.idEntidad)
            .subscribe(res => {
              if(res.status == 200){
                const archivos = (<FormArray>this.uploadForm.get(this.formArrayName));
                if(archivos){
                  const idsExistente: number[] = archivos.controls.map((control) => control.get('id').value);
                  res.rows.forEach(staff => {
                    if(!idsExistente.includes(staff.id)){
                      if(staff.tipoArchivo === 'application/pdf'){
                        staff.url = environment.api_url + '/DescargaServlet?path=' + staff.path;
                      }else{
                        staff.url = environment.api_url + '/DisplayImage?url=' + staff.path;
                      }
                      archivos.push(this.formBuilder.group(staff));
                    }                   
                  });
                }
              }
            });
      });
        
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

      if(document.vence){
        this.processDocument(dataType, fileItem, index);
      }else{
        this.saveDocument(dataType, fileItem, index);
      }
    }
    reader.readAsDataURL(fileItem);
  }

  

  editSubmit(index: number){

    let dataType = (<FormArray>this.uploadForm.get(this.formArrayName)).controls[index].value;
    let document = dataType.tipoDocumento;
    if(dataType.tipoArchivo === 'application/pdf'){
      dataType['url_path'] =  environment.api_url + '/DescargaServlet?path=' + dataType.path;
    }else{
      dataType['url_path'] =  environment.api_url + '/DisplayImage?url=' + dataType.path;
    }

    if(document.vence){

      const archivos = this.formBuilder.group({
        entidad: this.entidad,
        idEntidad: this.idEntidad,
        documentos: this.formBuilder.array([]),         
      });
      (<FormArray>archivos.get("documentos")).push(this.formBuilder.group(dataType));

      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '80%';
      dialogConfig.height = '77%';
      dialogConfig.data = archivos;
      dialogConfig.panelClass = 'mat-dialog-app-viewer';
      let dialogRef = this.dialog.open(ProcessModalComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          this.apiService.put('/archivos/add/' + this.idEntidad, result)
          .subscribe(res => {
            if(res.status == 200){
              if(res.model.tipoArchivo === 'application/pdf'){
                res.model['url_path']  =  environment.api_url + '/DescargaServlet?path=' + res.model.path;
              }else{
                res.model['url_path']  =  environment.api_url + '/DisplayImage?url=' + res.model.path;
              }              
              (<FormControl>(<FormArray>this.uploadForm.get(this.formArrayName)).controls[index]).patchValue(res.model);
            }
          });
          this.uploader.clearQueue();
        }
      });
      
    }else{
      this.apiService.put('/archivos/' + dataType.id,dataType)
      .subscribe(res => {
        if(res.status == 200){
          if(res.model.tipoArchivo === 'application/pdf'){
            res.model.url = environment.api_url + '/DescargaServlet?path=' + res.model.path;
          }else{
            res.model.url = environment.api_url + '/DisplayImage?url=' + res.model.path;
          }
          (<FormControl>(<FormArray>this.uploadForm.get(this.formArrayName)).controls[index]).patchValue(res.model);
        }
      });
    }  
  }

  viewImageFile(file : any): void {
    let image;
    var reader = new FileReader();
    reader.onloadend = (readerEvent) => {
      if (reader.result.toString().includes('data:application/pdf')) {
        this.loadViewPdf(reader.result.toString());
      }else{
        this.loadView([reader.result.toString().split(',')[1]]);
      }
    }
    reader.readAsDataURL(file);
  }

  viewUrlImageAll(){
    this.apiService.get('/archivos/' + this.entidad +'/' + this.idEntidad)
    .subscribe(res => {
      if(res.status == 200){
        let array = []
        res.rows.forEach(staff => {
          if(staff.tipoArchivo === 'application/pdf'){
            array.push(environment.api_url + '/DescargaServlet?path=' + staff.path);
          }else{
            array.push(environment.api_url + '/DisplayImage?url=' + staff.path);
          }
        });
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = array;
        //dialogConfig.width = '70%';
        //dialogConfig.autoFocus = true;
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
          this.apiService.delete('/archivos/' + data.id)
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

  getValue(data: any, form : FormControl): void {
    form.setValue(data);
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

  public processDocument(dataDocument: any, fileItem : any, index :  any){
    const archivos = this.formBuilder.group({
      entidad: this.entidad,
      idEntidad: this.idEntidad,
      documentos: this.formBuilder.array([]),         
    });
    (<FormArray>archivos.get("documentos")).push(this.formBuilder.group(dataDocument));

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '80%';
    dialogConfig.height = '77%';
    dialogConfig.data = archivos;
    dialogConfig.panelClass = 'mat-dialog-app-viewer';
    let dialogRef = this.dialog.open(ProcessModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.saveDocument(result, fileItem, index)
      }
    });
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
}
