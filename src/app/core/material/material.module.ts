import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatMenuModule , MatDialogModule, MatButtonModule, MatSidenavModule, MatIconModule,MatProgressSpinnerModule,
 MatInputModule, MatPaginatorModule, MatSortModule,MatAutocompleteSelectedEvent, MatChipInputEvent,MatSnackBarModule,
 MatTableModule, MatToolbarModule, MatSelectModule, MatListModule, MatDividerModule, MatNativeDateModule, MatCardModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';

@NgModule({
  imports: [
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    NgxMatSelectSearchModule,
    MatStepperModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatTableModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    FormsModule,
    MatToolbarModule,
    MatGridListModule,
    MatDatepickerModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    MatTabsModule,
    MatSidenavModule
  ],
  exports: [
    MatMenuModule,
    MatListModule,
    MatSortModule,
    MatStepperModule,
    NgxMatSelectSearchModule,
    MatChipsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonToggleModule,
    MatAutocompleteModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule
  ],
  providers: [
        //AuthGuard
        //{ provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
        //{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  declarations: []
})
export class MaterialModule { }
