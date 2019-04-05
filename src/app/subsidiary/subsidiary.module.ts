import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActivateSubsidiaryComponent, AddSubsidiaryComponent , DeleteSubsidiaryComponent, EditSubsidiaryComponent, ListSubsidiaryComponent,
ViewSubsidiaryComponent } from '../subsidiary';
import { MaterialModule } from '../core/material/material.module';

@NgModule({
  declarations: [
    ActivateSubsidiaryComponent,
    AddSubsidiaryComponent,
    DeleteSubsidiaryComponent,
    EditSubsidiaryComponent,
    ListSubsidiaryComponent,
    ViewSubsidiaryComponent
  ],
  imports: [
    MaterialModule
  ]
})
export class SubsidiaryModule { }
