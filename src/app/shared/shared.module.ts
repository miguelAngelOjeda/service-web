import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../core/material/material.module';
import { MenuItems } from './menu-items/menu-items';
import { BrowserModule } from '@angular/platform-browser';
import { ShowAuthedDirective } from './show-authed.directive';
import { DialogComponent } from './dialog';
import { CanAccessDirective } from './can-access.directive';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    ShowAuthedDirective,
    CanAccessDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    DialogComponent,
    AccordionDirective
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CanAccessDirective,
    ShowAuthedDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    DialogComponent
  ],
  entryComponents: [
    DialogComponent
  ],
  providers: [ MenuItems]
})
export class SharedModule {}
