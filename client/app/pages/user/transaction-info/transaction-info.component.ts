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
  txInfo: any;
  txid: String = this.router.url.split('/')[2];

  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.http.post(`${this.global.apiDomain}/api/block`,
      {'method': 'gettxbytxid', 'params': [this.txid]}).subscribe((res: any) => {
        this.txInfo = res.result;
        console.log(res);
    }, (err) => {
      console.log(err);
    });
  }
}
