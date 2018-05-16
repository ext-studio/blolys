import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GlobalService } from '../../../core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss']
})
export class AddressInfoComponent implements OnInit {
  addrTransactions: any;
  addrAssets: any;
  transTotal: Number = 0;
  show: any = [];
  isVisible: Boolean = false;
  pageSize: Number = 5;
  address: String = this.router.url.split('/')[2];

  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getIssues(1, this.pageSize);
    this.http.post(`${this.global.apiDomain}/api/asset`,
      {'method': 'getaddrassets', 'params': [this.address]}).subscribe((res: any) => {
        this.addrAssets = res.result;
    }, (err) => {
      console.log(err);
    });
  }
  showInfo(index) {
    this.show[index] = !this.show[index];
  }
  showAllTrans () {
    this.getIssues(1, this.transTotal);
    this.isVisible = true;
  }
  getIssues (pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      {'method': 'getpagetxbyaddress', 'params': [pageIndex, pageSize, this.address]}).subscribe((res: any) => {
        this.addrTransactions = res.result.data;
        this.transTotal = res.result.total;
    }, (err) => {
      console.log(err);
    });
  }
}
