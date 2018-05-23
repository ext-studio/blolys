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
  transfer: any = [];
  transferType: any = [];
  blockInfo: any = [];
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
    this.http.post(`${this.global.apiDomain}/api/index`,
      { 'method': 'queryallcounts' }).subscribe((res: any) => {
      if (res.code === 200) {
        this.totalBlocks = res.result.blockCounts ;
      }
    }, (err) => {
      console.log(err);
    });
    this.getBlockByHeight();
    this.getTxByHeight(1, this.pageSize);
  }
  initShow () {
    for (let i = 0; i < this.transTotal; i++) {
      this.show[i] = false;
      this.transfer[i] = '';
      this.transferType[i] = 0;
    }
  }
  getTxByHeight(pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'gettxbyheight', 'params': [pageIndex, pageSize, this.height] }).subscribe((res: any) => {
      if (res.code === 200) {
        this.blockTransactions = res.result.data;
        this.transTotal = res.result.total;
        this.initShow();
      }
    }, (err) => {
      console.log(err);
    });
  }
  getBlockByHeight() {
    this.http.post(`${this.global.apiDomain}/api/block`,
      { 'method': 'getblockbyheight', 'params': [this.height]} ).subscribe((res: any) => {
      if (res.code === 200) {
        this.blockInfo = res.result;
      }
    }, (err) => {
      console.log(err);
    });
  }
  getTransferByTxid (index, txid) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'gettransferbytxid', 'params': [txid] }).subscribe((res: any) => {
      if (res.code === 200) {
        this.transfer[index] = res.result;
        this.transferType[index] = 0;
      }
    }, (err) => {
      console.log(err);
    });
  }
  getNep5TransferByTxid (index, txid) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'getnep5transferbytxid', 'params': [txid] }).subscribe((res: any) => {
      if (res.code === 200) {
        this.transfer[index] = res.result;
        this.transferType[index] = 1;
      }
    }, (err) => {
      console.log(err);
    });
  }
  showInfo (index, txid) {
    this.show[index] = !this.show[index];
    this.getTransferByTxid(index, txid);
    this.getNep5TransferByTxid(index, txid);
  }
  showAllTrans() {
    this.getTxByHeight(1, this.transTotal);
    this.isVisible = true;
  }
  reHeight() {
    if (this.height > 1) {
      this.height -= 1;
      this.initShow();
      this.isVisible = false;
      this.router.navigate([`/block/${this.height}`]);
      this.getBlockByHeight();
      this.getTxByHeight(1, this.pageSize);
    }
  }
  addHeight() {
    if (this.height < this.totalBlocks) {
      this.height += 1;
      this.isVisible = false;
      this.router.navigate([`/block/${this.height}`]);
      this.getBlockByHeight();
      this.getTxByHeight(1, this.pageSize);
    }
  }
}
