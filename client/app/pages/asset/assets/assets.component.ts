import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AssetService } from '../asset.service';
import { Subscription } from 'rxjs/Subscription';
import { GlobalService } from '../../../core';

@Component({
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit, OnDestroy {
  assets: any = [];
  pageIndex: Number = 0;
  pageSize: any = 16;
  pageLength: number;
  isProgress: Boolean = true;
  apiDo: String;
  netDo: String;
  // assetType: String = 'Assets'; // 0 => assets, 1 => nep5Assets
  // showSortTran: Boolean = false;
  // showSortAddr: Boolean = false;

  assetsSub: Subscription = null;

  constructor(
    private router: Router,
    private assetService: AssetService,
    private global: GlobalService
  ) { }

  ngOnInit() {
    this.checkLangNet();
  }
  ngOnDestroy() {
    if (this.assetsSub) {
      this.assetsSub.unsubscribe();
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
  getAssets (pageIndex, pageSize) {
    this.assets = [];
    this.isProgress = true;
    pageIndex = Number(pageIndex);
    this.assetsSub =  this.assetService.Assets(this.apiDo, pageIndex, pageSize).subscribe((res: any) => {
      if (res.code === 200) {
        if (res.result.total > 0) {
          this.assets = res.result.data;
          this.pageLength = Math.ceil(res.result.total / this.pageSize);
          this.isProgress = false;
        }
      }
    });
  }
  onpageGo(num: number) {
    this.getAssets(num, this.pageSize);
  }
  // getNep5Assets (pageIndex, pageSize) {
  //   this.assets = [];
  //   this.isProgress = true;
  //   pageIndex = Number(pageIndex);
  //   this.assetService.Nep5Assets(pageIndex, pageSize).subscribe((res: any) => {
  //     if (res.result.total > 0) {
  //       this.assets = res.result.data;
  //       this.pageLength = Math.ceil(res.result.total / this.pageSize);
  //       this.isProgress = false;
  //     }
  //   });
  // }
  // changeAssetType (type) {
  //   if (type === 'Assets') {
  //     this.assetType = 'Assets';
  //   } else {
  //     this.assetType = 'Nep5';
  //   }
  //   this.pageIndex = 1;
  //   this.onpageGo(1);
  // }
  // onpageGo(num: number) {
  //   if (this.assetType === 'Assets') {
  //     this.getAssets(num, this.pageSize);
  //   } else {
  //     this.getNep5Assets(num, this.pageSize);
  //   }
  // }

  // sortTrans() {
  //   this.showSortTran = !this.showSortTran;
  // }
  // sortAddr() {
  //   this.showSortAddr = !this.showSortAddr;
  // }
}
