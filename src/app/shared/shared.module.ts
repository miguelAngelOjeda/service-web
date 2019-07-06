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
import { SnackbarService,SnackbarComponent } from '../shared';
import { DeleteDialogComponent, GalleryDialogComponent } from './dialog';
import { CanAccessDirective } from './can-access.directive';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { MapComponent } from '../shared/map';
import { ThumbnailDirective } from '../shared/upload';
import { DropifyImageComponent } from './dropify-image/dropify-image.component';
import { SelectFilterComponent } from './select-filter/select-filter.component';
import { ImageViewerModule } from 'ng2-image-viewer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ImageViewerModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC_AgWl-WeDY7gMMZoNUbAtp_S2Aw2lRFU'
    }),
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    ShowAuthedDirective,
    ThumbnailDirective,
    CanAccessDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    GalleryDialogComponent,
    DeleteDialogComponent,
    MapComponent,
    DropifyImageComponent,
    AccordionDirective,
    SelectFilterComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CanAccessDirective,
    ShowAuthedDirective,
    ThumbnailDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    MapComponent,
    DropifyImageComponent,
    GalleryDialogComponent,
    DeleteDialogComponent,
    SelectFilterComponent
  ],
  entryComponents: [
    GalleryDialogComponent,
    DeleteDialogComponent
  ],
  providers: [
    GoogleMapsAPIWrapper,
    MenuItems
  ]
})
export class SharedModule {}
