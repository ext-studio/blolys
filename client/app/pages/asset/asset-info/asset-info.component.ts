import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../core';
import { AssetService } from '../asset.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './asset-info.component.html',
  styleUrls: ['./asset-info.component.scss']
})
export class AssetInfoComponent implements OnInit, OnDestroy {
  isAddrProgress: Boolean = true;
  isRankProgress: Boolean = true;
  recentAddress: any = [];
  rankAddr: any = [];
  assetInfo: any = [];
  assetRegisterInfo: any = [];
  page: Number = 0;  // rank
  pageIndex: any = 0; // paginator
  addrPageSize: any = 5; // paginator
  rankPageSize: any = 5; // paginator
  addrPageLength: Number = 0; // paginator
  rankPageLength: Number = 0; // paginator
  rankPageTotal: Number = 0; // paginator
  assetType: String = this.router.url.split('/')[2];
  assetId: String = this.router.url.split('/')[3];
  apiDo: String;
  netDo: String;

  routerSub: Subscription = null;
  nep5InfoSub: Subscription = null;
  nep5RegisterInfoSub: Subscription = null;
  assetInfoSub: Subscription = null;
  addrByAssetidSub: Subscription = null;
  rankByAssetidSub: Subscription = null;
  // pattern = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;

  constructor(
    private router: Router,
    private assetService: AssetService,
    private http: HttpClient,
    private global: GlobalService,
  ) { }
  ngOnInit() {
    this.netDo = this.router.url.split('/')[1];
    if (this.global.net === 'mainnet') {
      this.apiDo = this.global.apiDomain;
    } else {
      this.apiDo = this.global.teApiDomain;
    }
    this.checkCondition();
    this.routerSub = this.router.events.subscribe((res: RouterEvent) => { // url
      if (res instanceof NavigationEnd) {
        if (this.assetId !== res.url.split('/')[3]) {
          this.assetType = res.url.split('/')[2];
          this.assetId = res.url.split('/')[3];
          this.checkCondition();
          this.recentAddress = [];
          this.rankAddr = [];
          this.onaddrPageGo(1);
          this.onrankPageGo(1);
        }
      }
    });
  }
  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    if (this.nep5InfoSub) {
      this.nep5InfoSub.unsubscribe();
    }
    if (this.nep5RegisterInfoSub) {
      this.nep5RegisterInfoSub.unsubscribe();
    }
    if (this.assetInfoSub) {
      this.assetInfoSub.unsubscribe();
    }
    if (this.addrByAssetidSub) {
      this.addrByAssetidSub.unsubscribe();
    }
    if (this.rankByAssetidSub) {
      this.rankByAssetidSub.unsubscribe();
    }
  }
  checkCondition () {
    this.assetInfo = [];
    this.assetRegisterInfo = [];
    if (this.assetType !== 'nep5') {
      this.assetInfoSub = this.assetService.AssetInfo(this.apiDo, this.assetId).subscribe((res: any) => {
        if (res.result) {
          this.assetInfo = res.result;
        }
      });
    } else {
      this.nep5InfoSub = this.assetService.Nep5Info(this.apiDo, this.assetId).subscribe((res: any) => {
        if (res.code === 200) {
          if (typeof res.result === 'object') {
            this.assetInfo = res.result;
            this.nep5RegisterInfoSub = this.assetService.Nep5RegisterInfo(this.apiDo, res.result.id).subscribe((res2: any) => {
              if (res2.result) {
                this.assetRegisterInfo = res2.result;
              }
            });
          } else if (typeof res.result === 'string') {
            this.router.navigate([`${this.netDo}/transaction/${res.result}`]);
          }
        }
      });
    }
  }
  getAddrByAssetid (pageIndex, pageSize) {
    this.recentAddress = [];
    this.isAddrProgress = true;
    this.addrByAssetidSub = this.assetService.AddrByAssetid(this.apiDo, pageIndex, pageSize, this.assetId).subscribe((res: any) => {
      if (res.result) {
        this.recentAddress = res.result.data;
        this.addrPageLength = Math.ceil(res.result.total / pageSize);
        this.isAddrProgress = false;
      }
    });
  }
  getRankByAssetid (pageIndex, pageSize) {
    this.rankAddr = [];
    this.isRankProgress = true;
    this.rankByAssetidSub = this.assetService.RankByAssetid(this.apiDo, pageIndex, pageSize, this.assetId).subscribe((res: any) => {
      if (res.result) {
        this.rankAddr = res.result.data;
        this.rankPageTotal = res.result.total;
        this.rankPageLength = Math.ceil(res.result.total / pageSize) < 20 ? Math.ceil(res.result.total / pageSize) : 20;
        this.isRankProgress = false;
      }
    });
  }
  onaddrPageGo(num: number) {
    this.getAddrByAssetid(num, this.addrPageSize);
  }
  onrankPageGo(num: number) {
    this.page = num - 1;
    this.getRankByAssetid(num, this.rankPageSize);
  }
}
