import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../core/material/material.module';
import { MenuItems } from './menu-items/menu-items';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { ShowAuthedDirective } from './show-authed.directive';
import { DeleteDialogComponent } from './dialog';
import { CanAccessDirective } from './can-access.directive';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { MapComponent } from '../shared/map';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC_AgWl-WeDY7gMMZoNUbAtp_S2Aw2lRFU'
    }),
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    ShowAuthedDirective,
    CanAccessDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    DeleteDialogComponent,
    MapComponent,
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
    MapComponent,
    DeleteDialogComponent
  ],
  entryComponents: [
    DeleteDialogComponent
  ],
  providers: [
    GoogleMapsAPIWrapper,
    MenuItems
  ]
})
export class SharedModule {}
