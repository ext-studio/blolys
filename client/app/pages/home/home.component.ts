import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AlertComponent } from '../../shared';

import { BlockService } from '../block/block.service';
import { AddressService } from '../address/address.service';
import { TransactionService } from '../transaction/transaction.service';
import { NotsearchService } from '../notsearch/notsearch.service';
import { AssetService } from '../asset/asset.service';
import { Subscription } from 'rxjs/Subscription';
import { GlobalService } from '../../core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  total: any = [];
  searchForm: FormGroup;
  queryCountTime: any;
  apiDo: String;
  netDo: String;

  conditionSub: Subscription = null;
  nep5InfoSub: Subscription = null;
  addrAssetsSub: Subscription = null;
  blockByHeightSub: Subscription = null;
  allcountsSub: Subscription = null;

  ngOnInit() {
    this.checkLangNet();
    this.searchForm = this.builder.group({
      searchName: ['', [Validators.required]]
    });
    this.allcountsSub = this.blockService.Allcounts(this.apiDo).subscribe((res: any) => {
      if (res.result) {
        this.total = res.result;
      }
    });
    this.queryCountTime = setInterval(() => {
      this.allcountsSub = this.blockService.Allcounts(this.apiDo).subscribe((res: any) => {
        if (res.result) {
          this.total = res.result;
        }
      });
    }, 20000);
  }
  ngOnDestroy() {
    window.clearInterval(this.queryCountTime);
    if (this.conditionSub) {
      this.conditionSub.unsubscribe();
    }
    if (this.nep5InfoSub) {
      this.nep5InfoSub.unsubscribe();
    }
    if (this.addrAssetsSub) {
      this.addrAssetsSub.unsubscribe();
    }
    if (this.blockByHeightSub) {
      this.blockByHeightSub.unsubscribe();
    }
    if (this.allcountsSub) {
      this.allcountsSub.unsubscribe();
    }
  }

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private blockService: BlockService,
    private addressService: AddressService,
    private transactionService: TransactionService,
    private notsearchService: NotsearchService,
    private assetService: AssetService,
    private global: GlobalService
  ) { }

  checkLangNet() {
    if (this.router.url.indexOf('/testnet') < 0) {
      this.apiDo = this.global.apiDomain;
      this.netDo = this.global.netDomain;
    } else {
      this.apiDo = this.global.apiDotest;
      this.netDo = this.global.netDotest;
    }
  }
  applyFilter($event) {
    if ($event.keyCode === 13) {
      let value = $event.target.value, isHashPattern: any, isAssetPattern: any, isAddressPattern: any;
      value = value.trim(); // Remove whitespace
      isHashPattern = /^(0x)([0-9a-f]{64})$/;
      isAssetPattern = /^([0-9a-f]{40})$/;
      isAddressPattern = /^A([0-9a-zA-Z]{33})$/;
      if (isHashPattern.test(value)) {
        this.conditionSub = this.notsearchService.Condition(this.apiDo, value).subscribe((res: any) => {
          if (res.code === 200) {
            if (res.result === '1') {
              this.router.navigate([`${this.netDo}/transaction/${value}`]);
            } else if (res.result === '0') {
              this.router.navigate([`${this.netDo}/asset/${value}`]);
            }
          } else {
            this.router.navigate([`${this.netDo}/search/${value}`]);
          }
        });
      } else if (isAssetPattern.test(value)) {
        this.nep5InfoSub = this.assetService.Nep5Info(this.apiDo, value).subscribe((res: any) => {
          if (res.code === 200) {
            if (typeof res.result === 'string') {
              this.router.navigate([`${this.netDo}/transaction/${res.result}`]);
            } else if (typeof res.result === 'object') {
              this.router.navigate([`${this.netDo}/nep5/${value}`]);
            }
          } else {
            this.router.navigate([`${this.netDo}/search/${value}`]);
          }
        });
      } else if (isAddressPattern.test(value)) {
        this.addrAssetsSub = this.addressService.AddrAssets(this.apiDo, value).subscribe((res: any) => {
          if (res.code === 200) {
            this.router.navigate([`${this.netDo}/address/${value}`]);
          } else {
            this.router.navigate([`${this.netDo}/search/${value}`]);
          }
        });
      } else if (Number(value[0]) >= 0) {
        let target = value.replace(/[,，]/g, '');
        let isNumberPattern: any;
        isNumberPattern = /^\d+$/;
        if (!isNaN(target) && isNumberPattern.test(value)) {
          target = Number(target);
          if (Number.isInteger(target) && target <= this.total.blockCounts) {
            this.router.navigate([`${this.netDo}/block/${target}`]);
            return;
          }
        }
        this.router.navigate([`${this.netDo}/search/${value}`]);
      } else {
        this.router.navigate([`${this.netDo}/search/${value}`]);
      }
    }
  }
}
