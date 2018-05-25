import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GlobalService } from '../../../core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss']
})
export class TransactionInfoComponent implements OnInit {
  transfer: any = [];
  transferType: Number = 0;
  txInfo: any = [];
  scripts: any = {};
  txid: String = this.router.url.split('/')[2];

  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      {'method': 'gettxbytxid', 'params': [this.txid]}).subscribe((res: any) => {
      if (res.code === 200) {
        this.txInfo = res.result;
      }
    }, (err) => {
      console.log(err);
    });
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      {'method': 'getscripts', 'params': [this.txid]}).subscribe((res: any) => {
        if (res.code === 200) {
          this.scripts = res.result;
        }
    }, (err) => {
      console.log(err);
    });
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'gettransferbytxid', 'params': [this.txid] }).subscribe((res: any) => {
      if (res.code === 200) {
        this.transfer = res.result;
        this.transferType = 0;
      }
    }, (err) => {
      console.log(err);
    });
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'getnep5transferbytxid', 'params': [this.txid] }).subscribe((res: any) => {
      if (res.code === 200) {
        this.transfer = res.result;
        this.transferType = 1;
      }
    }, (err) => {
      console.log(err);
    });
  }
}
