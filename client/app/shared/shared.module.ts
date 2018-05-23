import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  MatFormFieldModule, MatTooltipModule, MatButtonModule,
  MatToolbarModule, MatMenuModule, MatStepperModule,
  MatIconModule, MatInputModule, MatProgressBarModule,
  MatDialogModule
} from '@angular/material';
import { NgxEchartsModule } from 'ngx-echarts';
import { PaginatorComponent } from './compontent/paginator/paginator.component';
import { ShortHashPipe } from './pipes/shorthash.pipe';
import { UnixTimePipe } from './pipes/unixtime.pipe';
import { TransColorDirective } from './directive/trans-color.directive';
import { TransBorderColorDirective } from './directive/trans-border-color.directive';
import { AlertComponent } from './popups/alert/alert.component';
import { AssetColorDirective } from './directive/asset-color.directive';
import { TransTypePipe } from './pipes/trans-type.pipe';

@NgModule({
  imports: [
    CommonModule, MatButtonModule, MatTooltipModule,
    MatFormFieldModule, MatMenuModule, MatToolbarModule,
    FormsModule, MatIconModule, MatInputModule,
    MatProgressBarModule, ReactiveFormsModule, NgxEchartsModule,
    MatStepperModule, MatDialogModule
  ],
  exports: [
    CommonModule, MatButtonModule, MatMenuModule,
    MatFormFieldModule, MatToolbarModule, MatInputModule,
    FormsModule, MatTooltipModule, MatProgressBarModule,
    MatIconModule, NgxEchartsModule, ReactiveFormsModule,
    MatStepperModule, MatDialogModule,
    ShortHashPipe, UnixTimePipe,
    TransColorDirective, AlertComponent, AssetColorDirective,
    TransBorderColorDirective, TransTypePipe, PaginatorComponent,
  ],
  declarations: [
    PaginatorComponent, ShortHashPipe,
    UnixTimePipe, TransColorDirective, AlertComponent,
    AssetColorDirective, TransBorderColorDirective, TransTypePipe,
 ],
  entryComponents: [AlertComponent],
  providers: []
})
export class SharedModule { }
