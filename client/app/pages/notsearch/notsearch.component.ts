import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from '../../core';

import { BlockService } from '../block/block.service';
import { AddressService } from '../address/address.service';
import { NotsearchService } from './notsearch.service';
import { AssetService } from '../asset/asset.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-notsearch',
  templateUrl: './notsearch.component.html',
  styleUrls: ['./notsearch.component.scss']
})
export class NotsearchComponent implements OnInit, OnDestroy {
  total: any = [];
  searchForm: FormGroup;
  apiDo: String;
  netDo: String;

  conditionSub: Subscription = null;
  nep5InfoSub: Subscription = null;
  addrAssetsSub: Subscription = null;
  blockByHeightSub: Subscription = null;
  allcountsSub: Subscription = null;

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private blockService: BlockService,
    private addressService: AddressService,
    private notsearchService: NotsearchService,
    private assetService: AssetService,
    private global: GlobalService
  ) { }

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
  }
  ngOnDestroy() {
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
  @HostListener('window:load') public onReload() {
    let value: any;
    value = this.router.url.split('/')[3];
    this.search(value);
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
  applyFilter($event) {
    if ($event.keyCode === 13) {
      this.search($event.target.value);
    }
  }
  search(value) {
    value = value.trim(); // Remove whitespace
    let isHashPattern: any, isAssetPattern: any, isAddressPattern: any;
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
      value = value.replace(/[,，]/g, '');
      let isNumberPattern: any;
      isNumberPattern = /^\d+$/;
      if (!isNaN(value) && isNumberPattern.test(value)) {
        value = Number(value);
        if (Number.isInteger(value)) {
          this.router.navigate([`${this.netDo}/block/${value}`]);
          return;
        }
      }
      this.router.navigate([`${this.netDo}/search/${value}`]);
    } else {
      this.router.navigate([`${this.netDo}/search/${value}`]);
    }
  }
}
