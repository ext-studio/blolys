import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatFormFieldModule, MatTooltipModule, MatButtonModule,
  MatToolbarModule, MatMenuModule, MatStepperModule,
  MatIconModule, MatInputModule, MatProgressBarModule
} from '@angular/material';
import { NgxEchartsModule } from 'ngx-echarts';
import { PaginatorComponent } from './compontent/paginator/paginator.component';
import { ShortHashPipe } from './pipes/shorthash.pipe';
import { UnixDatePipe } from './pipes/unixdate.pipe';
import { UnixTimePipe } from './pipes/unixtime.pipe';
import { TransColorDirective } from './directive/trans-color.directive';
import { TransBorderColorDirective } from './directive/trans-border-color.directive';
import { AlertComponent } from './popups/alert/alert.component';
import { AssetColorDirective } from './directive/asset-color.directive';
import { TransTypePipe } from './pipes/trans-type.pipe';
import { LowTransTypePipe } from './pipes/low-trans-type.pipe';

@NgModule({
  imports: [
    CommonModule, MatButtonModule, MatTooltipModule,
    MatFormFieldModule, MatMenuModule, MatToolbarModule,
    FormsModule, MatIconModule, MatInputModule,
    MatProgressBarModule, ReactiveFormsModule, NgxEchartsModule,
    MatStepperModule
  ],
  exports: [
    CommonModule, MatButtonModule, MatMenuModule,
    MatFormFieldModule, MatToolbarModule, MatInputModule,
    FormsModule, MatTooltipModule, MatProgressBarModule,
    MatIconModule, NgxEchartsModule, ReactiveFormsModule,
    MatStepperModule,
    ShortHashPipe, UnixDatePipe, UnixTimePipe,
    TransColorDirective, AlertComponent, AssetColorDirective,
    TransBorderColorDirective, TransTypePipe, PaginatorComponent,
    LowTransTypePipe,
  ],
  declarations: [
    PaginatorComponent, ShortHashPipe, UnixDatePipe,
    UnixTimePipe, TransColorDirective, AlertComponent,
    AssetColorDirective, TransBorderColorDirective, TransTypePipe,
    LowTransTypePipe
  ],
  entryComponents: [],
  providers: []
})
export class SharedModule { }
