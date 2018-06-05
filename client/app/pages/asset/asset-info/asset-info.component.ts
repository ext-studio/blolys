import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AssetService } from '../asset.service';

@Component({
  templateUrl: './asset-info.component.html',
  styleUrls: ['./asset-info.component.scss']
})
export class AssetInfoComponent implements OnInit {
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
  assetType: String = this.router.url.split('/')[1];
  assetId: String = this.router.url.split('/')[2];

  constructor(
    private router: Router,
    private assetService: AssetService
  ) { }

  ngOnInit() {
    this.initPage();
    this.router.events.subscribe((res: RouterEvent) => { // url
      if (res instanceof NavigationEnd) {
        if ((res.url.indexOf('/asset/') >= 0 || res.url.indexOf('/nep5/') >= 0) && this.assetId !== res.url.split('/')[2]) {
          this.assetId = res.url.split('/')[2];
          this.assetType = res.url.split('/')[1];
          this.initPage();
          this.onaddrPageGo(1);
          this.onrankPageGo(1);
        }
      }
    });
  }
  initPage() {
    if (this.assetType !== 'nep5') {
      this.assetService.AssetInfo(this.assetId).subscribe((res: any) => {
        if (res.result) {
          this.assetInfo = res.result;
        }
      });
    } else {
      this.assetService.Nep5Info(this.assetId).subscribe((res: any) => {
        if (res.result) {
          this.assetInfo = res.result;
          this.assetService.Nep5RegisterInfo(res.result.id).subscribe((res2: any) => {
            if (res2.result) {
              this.assetRegisterInfo = res2.result;
            }
          });
        }
      });
    }
  }
  getAddrByAssetid (pageIndex, pageSize) {
    this.recentAddress = [];
    this.isAddrProgress = true;
    this.assetService.AddrByAssetid(pageIndex, pageSize, this.assetId).subscribe((res: any) => {
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
    this.assetService.RankByAssetid(pageIndex, pageSize, this.assetId).subscribe((res: any) => {
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
