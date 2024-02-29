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
import { DeleteDialogComponent, GalleryDialogComponent, GalleryDialogPdfComponent } from './dialog';
import { CanAccessDirective } from './can-access.directive';
import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
import { MapComponent } from '../shared/map';
import { ThumbnailDirective, UploadComponent } from '../shared/upload';
import { ViewUploadComponent } from '../shared/upload/view-upload';
import { ProcessModalComponent } from '../shared/upload/process-modal';
import { DropifyImageComponent } from './dropify-image/dropify-image.component';
import { SelectFilterComponent } from './select-filter/select-filter.component';
//import { ImageViewerModule } from 'ng2-image-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { FileUploadModule } from 'ng2-file-upload';
import { ImageViewerModule } from '@hallysonh/ngx-imageviewer';
import { NgxCurrencyModule } from "ngx-currency";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FileUploadModule,
    NgxExtendedPdfViewerModule,
    ImageViewerModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyB25HfMgLL_oEjj8RhzmOsJoqWcxlTkE-k'
    }),
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    ShowAuthedDirective,
    ThumbnailDirective,
    UploadComponent,
    ViewUploadComponent,
    CanAccessDirective,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    GalleryDialogComponent,
    GalleryDialogPdfComponent,
    ProcessModalComponent,
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
    UploadComponent,
    ViewUploadComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
    MapComponent,
    DropifyImageComponent,
    GalleryDialogComponent,
    GalleryDialogPdfComponent,
    ProcessModalComponent,
    DeleteDialogComponent,
    SelectFilterComponent
  ],
  entryComponents: [
    GalleryDialogComponent,
    GalleryDialogPdfComponent,
    ProcessModalComponent,
    DeleteDialogComponent
  ],
  providers: [
    GoogleMapsAPIWrapper,
    MenuItems
  ]
})
export class SharedModule {}
