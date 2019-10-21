import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { FormGroup, FormArray , FormControl, FormBuilder, Validators, NgForm, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-filter-sheet',
  templateUrl: './filter-sheet.component.html',
  styleUrls: ['./filter-sheet.component.scss']
})
export class FilterSheetComponent implements OnInit{
  filterForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _bottomSheetRef: MatBottomSheetRef<FilterSheetComponent>
  ) {}

  ngOnInit() {
    this.initFormBuilder();
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  getValue(data: any, form : any): void {
    (<FormControl>this.filterForm.get(form)).setValue(data);
  }

  public initFormBuilder(){
    let deste = new Date();
    deste.setDate(1);
    this.filterForm = this.formBuilder.group({
      fechaDesde: deste.toISOString(),
      fechaHasta: new Date().toISOString(),
      documento: null,
      ruc: null,
      nroSolicitud: null,
      nroCredito: null,
      estado: null,
      sucursal: null,
    });
  }
}
