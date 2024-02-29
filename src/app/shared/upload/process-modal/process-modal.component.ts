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
  documentAdd : any[] = [];
  public documentModel: FormGroup;
  url_path;
  currentIndex = 0;
  

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
      if(documentValue.url_path){
        (<FormGroup>(<FormArray>this.uploadForm.get("documentos")).at(0)).addControl('checked',this.formBuilder.control(true));
      }
    }
    this.documentData = data;  
  }

  ngOnInit() {
    if((<FormArray>this.uploadForm.get("documentos")).length == 1){
      var documentValue = (<FormGroup>(<FormArray>this.uploadForm.get("documentos")).at(0)).value;      
       
      if(documentValue.url_path){
        if(documentValue.fechaVencimiento){
          documentValue.fechaVencimiento = new Date(documentValue.fechaVencimiento);
        }
        this.url_path = documentValue.url_path;
        this.documentModel.patchValue(documentValue);
        this.documentAdd.push(documentValue);
      }
    }
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
    if(this.documentAdd.length > 0){
      var dataDocument = this.documentAdd[this.currentIndex];
      console.log(this.documentModel.get("id").value);
      if(this.documentModel.get("id").value != null){
        // Obtener el dato actual del array
        this.apiService.put('/archivos/add/' + this.uploadForm.get("idEntidad").value, this.documentModel.value)
        .subscribe(res => {
          if(res.status == 200){             
            //this.documentModel.reset();
            //this.url_path = null;
            // Mover al siguiente índice
            this.currentIndex++;
            this.cargarDatosForm();

            // Verificar si hemos llegado al final del array
            if (this.currentIndex >= this.documentAdd.length) {
              // Si llegamos al final, reiniciar el índice
              this.dialogRef.close(this.documentModel.value);
            }
          }
        });
        this.url_path = null; 
      }else{
        this.dialogRef.close(this.documentModel.value);
      }      
    }
  }

  cargarDatosForm(){
    this.documentModel.reset();
    let datos = this.documentAdd[this.currentIndex];
    setTimeout(() => {
      if(datos.fechaVencimiento){
        datos.fechaVencimiento = new Date(datos.fechaVencimiento);
      }
      this.documentModel.patchValue(datos);
      this.url_path = datos.url;
    });
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

  onCheckboxChange(event: any, index : any){
    let document = (<FormGroup>(<FormArray>this.uploadForm.get("documentos")).at(index)).value
    if(event.checked){
      this.documentAdd.push(document);
      if(this.documentAdd.length > 0 && this.documentModel.value.id != this.documentAdd[0].id){
        setTimeout(() => {
          if(this.documentAdd[0].fechaVencimiento){
            this.documentAdd[0].fechaVencimiento = new Date(this.documentAdd[0].fechaVencimiento);
          }
          this.documentModel.patchValue(this.documentAdd[0]);
          this.url_path = this.documentAdd[0].url;
        });
      }
    }else{
      this.documentAdd = this.documentAdd.filter(objeto => objeto.id !== document.id);
      if(this.documentAdd.length > 0 && this.documentModel.value.id != this.documentAdd[0].id){
        setTimeout(() => {
          if(this.documentAdd[0].fechaVencimiento){
            this.documentAdd[0].fechaVencimiento = new Date(this.documentAdd[0].fechaVencimiento);
          }
          this.documentModel.patchValue(this.documentAdd[0]);
          this.url_path = this.documentAdd[0].url;
        });
      }
    }
  }

}
