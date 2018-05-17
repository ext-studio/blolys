import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GlobalService } from '../../../core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './asset-address.component.html',
  styleUrls: ['./asset-address.component.scss']
})
export class AssetAddressComponent implements OnInit {
  displayedColumns = ['address', 'balance', 'occupancy'];
  allAddress: MatTableDataSource<any>;
  assetInfo: any;
  pageSize: any = 16;
  pageLength: number;
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
    this.getIssues(1, this.pageSize);
  }
  getIssues (pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/address`,
      { 'method': 'getaddrbyasset', 'params': [1, this.pageSize, this.assetId] }).subscribe((res: any) => {
      this.allAddress = new MatTableDataSource(res.result.data);
    }, (err) => {
      console.log(err);
    });
  }
  onpageGo(num: number) {
    this.getIssues(num, this.pageSize);
  }
}
