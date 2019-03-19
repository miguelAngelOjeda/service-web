import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatMenuModule , MatDialogModule, MatButtonModule, MatSidenavModule, MatIconModule,
 MatInputModule, MatPaginatorModule, MatSortModule,
 MatTableModule, MatToolbarModule, MatSelectModule, MatListModule, MatDividerModule, MatNativeDateModule, MatCardModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {MatChipsModule} from '@angular/material/chips';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  imports: [
    MatMenuModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatInputModule,
    MatChipsModule,
    MatTableModule,
    MatToolbarModule,
    MatDatepickerModule,
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
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule
  ],
  declarations: []
})
export class MaterialModule { }
