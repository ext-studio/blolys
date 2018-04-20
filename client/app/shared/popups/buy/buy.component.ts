import { Component, OnInit, Inject, HostBinding } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    templateUrl: 'buy.component.html',
    styleUrls: ['buy.component.css']
})
export class BuyComponent implements OnInit {
    public copyBtn: string = 'Copy Address';
    constructor(
        private dialogRef: MatDialogRef<BuyComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {}

    ngOnInit() {
        // console.log(this.data);
    }
    public copied() {
        this.copyBtn = 'Copied : )';
    }
    public error() {
        this.copyBtn = 'Copy Failed : (';
    }
}
