import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,MatTooltipModule,
    MatDialogModule,MatMenuModule,
    MatSidenavModule, MatCheckboxModule, MatChipsModule,
    MatToolbarModule, MatStepperModule, MatProgressSpinnerModule,
    MatPaginatorModule, MatTableModule,
    MatRadioModule, MatSelectModule
} from '@angular/material';
import { BufferImageDirective } from './directives/buffer-image';
import { AlertComponent } from './popups/alert/alert.component';
import { BuyComponent } from './popups/buy/buy.component';
import { UploaderDirective } from './directives/uploader';
import { ShortHashPipe } from './pipes/shorthash.pipe';
import { UnixTimePipe } from './pipes/unixtime.pipe';
import { UnixDatePipe } from './pipes/unixdate.pipe';
import { CommaPipe } from './pipes/comma.pipe';
import { CopyDirective } from './directives/copy';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule, MatTooltipModule,
        MatFormFieldModule, MatMenuModule,
        MatDialogModule, MatCheckboxModule,
        MatSidenavModule, MatProgressSpinnerModule,
        MatToolbarModule, MatInputModule, MatChipsModule,
        FormsModule, MatPaginatorModule, MatTableModule,
        MatRadioModule, MatSelectModule
    ],
    exports: [
        CommonModule,
        MatButtonModule, MatMenuModule,
        MatIconModule, UnixDatePipe, CommaPipe,
        MatFormFieldModule, MatCheckboxModule,
        MatDialogModule, MatProgressSpinnerModule,
        MatSidenavModule, MatInputModule, BuyComponent,
        MatToolbarModule, MatStepperModule, ReactiveFormsModule,
        BufferImageDirective, FormsModule, UploaderDirective,
        ShortHashPipe, UnixTimePipe, MatChipsModule,
        MatTooltipModule, MatPaginatorModule, MatTableModule,
        MatTooltipModule, MatRadioModule, MatSelectModule,
        CopyDirective
    ],
    declarations: [
        BufferImageDirective, AlertComponent,
        UploaderDirective, BuyComponent, UnixTimePipe,
        ShortHashPipe, UnixDatePipe, CommaPipe,
        CopyDirective
    ],
    entryComponents: [
        AlertComponent, BuyComponent
    ],
    providers: []
})
export class SharedModule { }
