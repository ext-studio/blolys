import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../core';
import { Router } from '@angular/router';

interface AssetInfo {
  name: string;
  admin: string;
  amount: number;
  type: string;
  // time: number;
  blockIndex: number;
  transactions: number;
  precision: number;
  addresses: number;
}

@Component({
  templateUrl: './asset-info.component.html',
  styleUrls: ['./asset-info.component.scss']
})
export class AssetInfoComponent implements OnInit {
  isAddrProgress: Boolean = true;
  isRankProgress: Boolean = true;
  recentAddress: any = [];
  rankAddr: any = [];
  assetInfo: AssetInfo = {
    name: '',
    admin: '',
    amount: 0,
    type: '',
    // time: 0,
    blockIndex: 0,
    transactions: 0,
    precision: 0,
    addresses: 0
  };
  assetRegisterInfo: any;
  pageIndex: any = 0;
  page: Number = 0;
  addrPageSize: any = 5;
  rankPageSize: any = 5;
  addrPageLength: Number;
  rankPageLength: Number = 20;
  assetType: String = this.router.url.split('/')[1];
  assetId: String = this.router.url.split('/')[2];

  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAddrByAssetid(1, this.addrPageSize);
    this.getRankByAssetid(1, this.rankPageSize);
    if (this.assetType !== 'nep5') {
      this.http.post(`${this.global.apiDomain}/api/asset`,
        {'method': 'getassetinfo', 'params': [this.assetId]}).subscribe((res: any) => {
          this.assetInfo = res.result;
      }, (err) => {
        console.log(err);
      });
    } else {
      this.http.post(`${this.global.apiDomain}/api/asset`,
        {'method': 'getnep5info', 'params': [this.assetId]}).subscribe((res: any) => {
          this.assetInfo = res.result;
      }, (err) => {
        console.log(err);
      });
      this.http.post(`${this.global.apiDomain}/api/asset`,
        {'method': 'getnep5registerinfo', 'params': [1]}).subscribe((res: any) => {
          this.assetRegisterInfo = res.result;
      }, (err) => {
        console.log(err);
      });
    }
  }
  getAddrByAssetid (pageIndex, pageSize) {
    this.recentAddress = [];
    this.isAddrProgress = true;
    this.http.post(`${this.global.apiDomain}/api/address`,
      { 'method': 'getaddrbyassetid', 'params': [pageIndex, pageSize, this.assetId] }).subscribe((res: any) => {
      this.recentAddress = res.result.data;
      this.addrPageLength = res.result.total;
      this.isAddrProgress = false;
    }, (err) => {
      console.log(err);
    });
  }
  getRankByAssetid (pageIndex, pageSize) {
    this.rankAddr = [];
    this.isRankProgress = true;
    this.http.post(`${this.global.apiDomain}/api/address`,
      { 'method': 'getrankbyassetid', 'params': [pageIndex, pageSize, this.assetId] }).subscribe((res: any) => {
      this.rankAddr = res.result.data;
      this.isRankProgress = false;
    }, (err) => {
      console.log(err);
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
