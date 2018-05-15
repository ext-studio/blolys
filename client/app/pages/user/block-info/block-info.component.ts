import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GlobalService } from '../../../core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './block-info.component.html',
  styleUrls: ['./block-info.component.scss']
})
export class BlockInfoComponent implements OnInit {
  blockTransactions: any;
  blockInfo: any;
  transTotal: Number;
  height: number = Number(this.router.url.split('/')[2]);

  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.http.post(`${this.global.apiDomain}/api/block`,
      {'method': 'getblockbyheight', 'params': [this.height]}).subscribe((res: any) => {
      this.blockInfo = res.result;
    }, (err) => {
      console.log(err);
    });
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'gettxbyheight', 'params': [1, 5, this.height] }).subscribe((res: any) => {
      this.blockTransactions = res.result.data;
      this.transTotal = res.result.total;
    }, (err) => {
      console.log(err);
    });
  }
  reHeight() {
    this.height -= 1;
  }
  addHeight() {
    this.height += 1;
  }
}
