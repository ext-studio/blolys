import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatFormFieldModule, MatTableModule, MatPaginatorModule,
  MatTooltipModule, MatButtonModule, MatToolbarModule,
  MatMenuModule, MatStepperModule, MatIconModule,
  MatInputModule
} from '@angular/material';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  imports: [
    CommonModule, MatButtonModule, MatTooltipModule,
    MatFormFieldModule, MatMenuModule, MatToolbarModule,
    FormsModule, MatPaginatorModule, MatTableModule,
    MatIconModule, MatInputModule
  ],
  exports: [
    CommonModule, MatButtonModule, MatMenuModule,
    MatFormFieldModule, MatToolbarModule, MatStepperModule,
    ReactiveFormsModule, FormsModule, MatTooltipModule,
    MatPaginatorModule, MatTableModule, MatInputModule,
    NgxEchartsModule, MatIconModule
  ],
  declarations: [],
  entryComponents: [],
  providers: []
})
export class SharedModule { }
