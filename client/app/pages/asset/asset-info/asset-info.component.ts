import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  pageIndex: any = 0;
  page: Number = 0;
  addrPageSize: any = 5;
  rankPageSize: any = 5;
  addrPageLength: Number = 0;
  rankPageLength: Number = 0;
  assetType: String = this.router.url.split('/')[1];
  assetId: String = this.router.url.split('/')[2];

  constructor(
    private router: Router,
    private assetService: AssetService
  ) { }

  ngOnInit() {
    this.getAddrByAssetid(1, this.addrPageSize);
    this.getRankByAssetid(1, this.rankPageSize);
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
