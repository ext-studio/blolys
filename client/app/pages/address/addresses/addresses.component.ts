import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from '../address.service';
import { Subscription } from 'rxjs/Subscription';
import { GlobalService } from '../../../core';

@Component({
    templateUrl: './addresses.component.html',
    styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit, OnDestroy {
    addresses: any = [];
    pageIndex: any = 0;
    pageSize: any = 16;
    pageLength: any = 0;
    isProgress: Boolean = true;
    apiDo: String;
    netDo: String;
    addressesSub: Subscription = null;

    constructor(
        private addressService: AddressService,
        private global: GlobalService,
        private router: Router
    ) { }

    ngOnInit() {
        this.checkLangNet();
    }
    ngOnDestroy() {
        if (this.addressesSub) {
            this.addressesSub.unsubscribe();
        }
    }
    checkLangNet() {
        if (this.router.url.indexOf('/testnet') < 0) {
            this.apiDo = this.global.apiDomain;
            this.netDo = this.global.netDomain;
        } else {
            this.apiDo = this.global.apiDotest;
            this.netDo = this.global.netDotest;
        }
    }
    getAddresses(pageIndex, pageSize) {
        this.addresses = [];
        this.isProgress = true;
        this.addressesSub = this.addressService.Addresses(this.apiDo, pageIndex, pageSize).subscribe((res: any) => {
            if (res.code === 200) {
                if (res.result.total > 0) {
                    this.addresses = res.result.data;
                    this.pageLength = Math.ceil(res.result.total / this.pageSize);
                    this.isProgress = false;
                }
            }
        });
    }
    onpageGo(num: number) {
        this.getAddresses(num, this.pageSize);
    }
}
