import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetService } from '../asset.service';

@Component({
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  assets: any = [];
  pageIndex: Number = 0;
  pageSize: any = 16;
  pageLength: number;
  assetType: String = 'Assets'; // 0 => assets, 1 => nep5Assets
  showSortTran: Boolean = false;
  showSortAddr: Boolean = false;
  isProgress: Boolean = true;

  constructor(
    private assetService: AssetService
  ) { }

  ngOnInit() { }
  sortTrans() {
    this.showSortTran = !this.showSortTran;
  }
  sortAddr() {
    this.showSortAddr = !this.showSortAddr;
  }
  getAssets (pageIndex, pageSize) {
    this.assets = [];
    this.isProgress = true;
    pageIndex = Number(pageIndex);
    this.assetService.Assets(pageIndex, pageSize).subscribe((res: any) => {
      if (res.result) {
        this.assets = res.result.data;
        this.pageLength = Math.ceil(res.result.total / this.pageSize);
        this.isProgress = false;
      }
    });
  }
  getNep5Assets (pageIndex, pageSize) {
    this.assets = [];
    this.isProgress = true;
    pageIndex = Number(pageIndex);
    this.assetService.Nep5Assets(pageIndex, pageSize).subscribe((res: any) => {
      if (res.result) {
        this.assets = res.result.data;
        this.pageLength = Math.ceil(res.result.total / this.pageSize);
        this.isProgress = false;
      }
    });
  }
  changeAssetType (type) {
    if (type === 'Assets') {
      this.assetType = 'Assets';
      // this.getAssets(1, this.pageSize);
    } else {
      this.assetType = 'Nep5';
      // this.getNep5Assets(1, this.pageSize);
    }
    this.pageIndex = 1;
    this.onpageGo(1);
  }
  onpageGo(num: number) {
    if (this.assetType === 'Assets') {
      this.getAssets(num, this.pageSize);
    } else {
      this.getNep5Assets(num, this.pageSize);
    }
  }
}
