import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './asset-info.component.html',
  styleUrls: ['./asset-info.component.scss']
})
export class AssetInfoComponent implements OnInit {
  recentAddress: any;
  rankAddr: any;
  assetInfo: any;
  pageIndex: Number = 0;
  addrPageSize: any = 5;
  rankPageSize: any = 5;
  addrPageLength: Number;
  rankPageLength: Number = 20;
  assetId: String = this.router.url.split('/')[3];

  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.http.post(`${this.global.apiDomain}/api/asset`,
      {'method': 'getassetinfo', 'params': [this.assetId]}).subscribe((res: any) => {
        this.assetInfo = res.result;
    }, (err) => {
      console.log(err);
    });
    this.getAddrByAssetid(1, this.addrPageSize);
    this.getRankByAssetid(1, this.rankPageSize);
  }
  getAddrByAssetid (pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/address`,
      { 'method': 'getaddrbyassetid', 'params': [pageIndex, pageSize, this.assetId] }).subscribe((res: any) => {
      this.recentAddress = res.result.data;
      this.addrPageLength = res.result.total;
    }, (err) => {
      console.log(err);
    });
  }
  getRankByAssetid (pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/address`,
      { 'method': 'getrankbyassetid', 'params': [pageIndex, pageSize, this.assetId] }).subscribe((res: any) => {
      this.rankAddr = res.result.data;
    }, (err) => {
      console.log(err);
    });
  }
  onaddrPageGo(num: number) {
    this.getAddrByAssetid(num, this.addrPageSize);
  }
  onrankPageGo(num: number) {
    this.pageIndex = num - 1;
    this.getRankByAssetid(num, this.rankPageSize);
  }
}
