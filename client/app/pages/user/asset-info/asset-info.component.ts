import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GlobalService } from '../../../core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './asset-info.component.html',
  styleUrls: ['./asset-info.component.scss']
})
export class AssetInfoComponent implements OnInit {
  displayedColumns = ['address', 'createdAt', 'lastTransactionTime', 'transactions'];
  recentAddress: MatTableDataSource<any>;
  assetInfo: any;
  pageSize: Number = 5;
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
    this.http.post(`${this.global.apiDomain}/api/address`,
      { 'method': 'getaddrbyasset', 'params': [1, this.pageSize, this.assetId] }).subscribe((res: any) => {
      this.recentAddress = new MatTableDataSource(res.result.data);
    }, (err) => {
      console.log(err);
    });
  }
}
