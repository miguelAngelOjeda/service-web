import { Component, ViewChild, OnInit, OnChanges, Inject, SimpleChanges, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material";
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, ControlContainer, FormGroupDirective} from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from "../../../core";
import { MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material";
import { ApiService} from '../../../core/services';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-process-modal',
  templateUrl: './process-modal.component.html',
  styleUrls: ['./process-modal.component.css']
})
export class ProcessModalComponent implements OnInit{
  public documentData;
  uploadForm: FormGroup;
  public documentModel: FormGroup;
  url_path;
  

  constructor(
    private http: HttpClient,
    public sanitizer: DomSanitizer,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private apiService: ApiService,
    public dialogRef: MatDialogRef<ProcessModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.inicializarFormulario();
    this.uploadForm = <FormGroup>data;
    if((<FormArray>this.uploadForm.get("documentos")).length == 1){
      var documentValue = (<FormGroup>(<FormArray>this.uploadForm.get("documentos")).at(0)).value;
      if(documentValue.fechaVencimiento){
        documentValue.fechaVencimiento = new Date(documentValue.fechaVencimiento);
      } 
      this.documentModel.patchValue(documentValue);
      this.url_path = documentValue.url_path;
    }
    this.documentData = data;
      
  }

  ngOnInit() {
    
  }

  inicializarFormulario() {
    this.documentModel = this.formBuilder.group({
      id: null,
      size: null,
      entidad: null,
      idEntidad: null,
      documentoPersona: null,
      nombreDocumento: null,
      path: null,
      file: null,
      url: null,
      tipoArchivo: null,
      fechaVencimiento: null,
      tipoDocumento: [null, [Validators.required]],
      activo: ['S']
    });
  }

  close() {
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.uploadForm.get("idEntidad").value != this.documentModel.get("idEntidad").value){
      this.apiService.put('/archivos/add/' + this.uploadForm.get("idEntidad").value, this.documentModel.value)
          .subscribe(res => {
            if(res.status == 200){
              (<FormArray>this.uploadForm.get("documentos")).removeAt((<FormArray>this.uploadForm.get("documentos")).value.findIndex(dep => dep.id === this.documentModel.value.id));
              this.documentModel.reset();
              this.url_path = null;
            }
          });
    }else{
      this.dialogRef.close(this.documentModel.value);
    }
    
  }

  viewDocument(index:number) {
    let document = (<FormGroup>(<FormArray>this.uploadForm.get("documentos")).at(index)).value;
    setTimeout(() => {
      if(document.fechaVencimiento){
        document.fechaVencimiento = new Date(document.fechaVencimiento);
      }
      this.documentModel.patchValue(document);
      this.url_path = document.url;
    });
  }

  private downloadFile(url: string): any {
    return this.http.get(url, { responseType: 'blob' })
    .pipe(
      map((result: any) => {
        return result;
      })
    );
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.documentModel.get(form)).setValue(data);
  }

}
