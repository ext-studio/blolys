import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GlobalService } from '../../../core';
import { Router } from '@angular/router';

interface BlockInfo {
  hash: string;
  time: number;
  size: number;
  version: number;
  merkleRoot: string;
  txNum: number;
}

@Component({
  templateUrl: './block-info.component.html',
  styleUrls: ['./block-info.component.scss']
})
export class BlockInfoComponent implements OnInit {
  blockTransactions: any;
  blockInfo: BlockInfo = {
    hash: '',
    time: 0,
    size: 0,
    version: 0,
    merkleRoot: '',
    txNum: 0
  };
  transTotal: Number = 0;
  totalBlocks: Number = 0;
  show: any = [];
  pageSize: Number = 5;
  isVisible: Boolean = false;
  height: number = Number(this.router.url.split('/')[2]);
  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    for (let i = 0; i < 16; i++) {
      this.show[i] = false;
    }
    this.http.post(`${this.global.apiDomain}/api/index`,
      { 'method': 'queryallcounts' }).subscribe((res: any) => {
      this.totalBlocks = res.result.blockCounts ;
    }, (err) => {
      console.log(err);
    });
    this.getBlockByHeight();
    this.getTxByHeight(1, this.pageSize);
  }
  getTxByHeight(pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'gettxbyheight', 'params': [pageIndex, pageSize, this.height] }).subscribe((res: any) => {
      this.blockTransactions = res.result.data;
      this.transTotal = res.result.total;
    }, (err) => {
      console.log(err);
    });
  }
  getBlockByHeight() {
    this.http.post(`${this.global.apiDomain}/api/block`,
      { 'method': 'getblockbyheight', 'params': [this.height]} ).subscribe((res: any) => {
      this.blockInfo = res.result;
    }, (err) => {
      console.log(err);
    });
  }
  showInfo(index) {
    this.show[index] = !this.show[index];
  }
  showAllTrans() {
    this.getTxByHeight(1, this.transTotal);
    this.isVisible = true;
  }
  reHeight() {
    if (this.height > 1) {
      this.height -= 1;
      this.router.navigate([`/block/${this.height}`]);
      this.getBlockByHeight();
      this.getTxByHeight(1, this.pageSize);
    }
  }
  addHeight() {
    if (this.height < this.totalBlocks) {
      this.height += 1;
      this.router.navigate([`/block/${this.height}`]);
      this.getBlockByHeight();
      this.getTxByHeight(1, this.pageSize);
    }
  }
}
