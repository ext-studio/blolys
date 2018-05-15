import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { GlobalService } from '../../../core';

@Component({
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {
  displayedColumns = ['name', 'type', 'amount', 'addresses', 'transactions', 'admin'];
  dataSource: MatTableDataSource<any>;
  pageSize: any = 16;
  pageLength: number;
  showSortTran: Boolean = false;
  showSortAddr: Boolean = false;

  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  ngOnInit() {
    this.getIssues(1, this.pageSize);
  }
  sortTrans() {
    this.showSortTran = !this.showSortTran;
  }
  sortAddr() {
    this.showSortAddr = !this.showSortAddr;
  }
  getIssues(pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/asset`,
      { 'method': 'getassets', 'params': [pageIndex, pageSize] }).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.result.data);
      this.pageLength = Math.ceil(res.result.total / this.pageSize);
    }, (err) => {
      console.log(err);
    });
  }
  onpageGo(num: number) {
    this.getIssues(num, this.pageSize);
  }
}
