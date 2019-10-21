import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatMenuModule , MatDialogModule, MatButtonModule, MatSidenavModule, MatIconModule,MatProgressSpinnerModule,
 MatInputModule, MatPaginatorModule, MatSortModule,MatAutocompleteSelectedEvent, MatChipInputEvent,MatSnackBarModule,
 MatTableModule, MatToolbarModule, MatSelectModule, MatListModule, MatDividerModule, MatNativeDateModule, MatCardModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatExpansionModule} from '@angular/material/expansion';

//create our cost var with the information about the format that we want
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM YYYY',
  },
};

@NgModule({
  imports: [
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatExpansionModule,
    MatStepperModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBottomSheetModule,
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
    MatChipsModule,
    MatRadioModule,
    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatBottomSheetModule,
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
  ]
})
export class MaterialModule { }
