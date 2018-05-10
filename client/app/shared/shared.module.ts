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
import { PaginatorComponent } from './compontent/paginator/paginator.component';
import { ShortHashPipe } from './pipes/shorthash.pipe';
import { UnixDatePipe } from './pipes/unixdate.pipe';
import { UnixTimePipe } from './pipes/unixtime.pipe';

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
    NgxEchartsModule, MatIconModule, PaginatorComponent,
    ShortHashPipe, UnixDatePipe, UnixTimePipe
  ],
  declarations: [
    PaginatorComponent, ShortHashPipe, UnixDatePipe,
    UnixTimePipe
  ],
  entryComponents: [],
  providers: []
})
export class SharedModule { }
