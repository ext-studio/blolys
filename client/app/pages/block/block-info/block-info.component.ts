import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

import { BlockService } from '../block.service';
import { TransactionService } from '../../transaction/transaction.service';

@Component({
  templateUrl: './block-info.component.html',
  styleUrls: ['./block-info.component.scss']
})
export class BlockInfoComponent implements OnInit {
  blockTransactions: any = [];
  transfer: any = [];
  transferType: any = [];
  blockInfo: any = [];
  transTotal: Number = 0;
  totalBlocks: Number = 0;
  show: any = [];
  isVisible: Boolean = false;
  height: number = Number(this.router.url.split('/')[2]);
  pageIndex: any = 0;
  pageSize: any = 5;
  pageLength: any = 0;
  isProgress: Boolean = true;
  constructor(
    private router: Router,
    private blockService: BlockService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.initPage();
    this.router.events.subscribe((res: RouterEvent) => {
      if (res instanceof NavigationEnd) {
        if (res.url.indexOf('/block/') >= 0) {
          if (this.height !== Number(res.url.split('/')[2])) {
            this.height = Number(res.url.split('/')[2]);
            this.initPage();
            this.onpageGo(1);
          }
        }
      }
    });
  }
  initPage() {
    this.blockTransactions = [];
    this.transfer = [];
    this.blockInfo = [];
    this.initShow();
    this.isVisible = false;
    this.blockService.Allcounts().subscribe((res: any) => {
      if (res.result) {
        this.totalBlocks = res.result.blockCounts ;
      }
    });
    this.getBlockByHeight();
  }
  initShow () {
    for (let i = 0; i < this.transTotal; i++) {
      this.show[i] = false;
      this.transfer[i] = '';
      this.transferType[i] = -1;
    }
  }
  getTxByHeight(pageIndex, pageSize) {
    this.blockTransactions = [];
    this.isProgress = true;
    this.blockService.TxByHeight(pageIndex, pageSize, this.height).subscribe((res: any) => {
      if (res.result) {
        this.blockTransactions = res.result.data;
        this.transTotal = res.result.total;
        this.pageLength = Math.ceil(res.result.total / this.pageSize);
        this.isProgress = false;
      } else {
        this.blockTransactions = false;
      }
    });
  }
  getBlockByHeight() {
    this.blockService.BlockByHeight(this.height).subscribe((res: any) => {
      if (res.result) {
        this.blockInfo = res.result;
      }
    });
  }
  getTransferByTxid (index, txid) {
    this.transactionService.TransferByTxid(index, txid).subscribe((res: any) => {
      if (res.code === 200) {
        if (res.result.TxUTXO != null || res.result.TxVouts != null) {
          this.transfer[index] = res.result;
          this.transferType[index] = 0;
        }
      }
    });
  }
  getNep5TransferByTxid (index, txid) {
    this.transactionService.Nep5TransferByTxid(index, txid).subscribe((res: any) => {
      if (res.code === 200) {
        if (res.result.length > 0) {
          this.transfer[index] = res.result;
          this.transferType[index] = 1;
        }
      }
    });
  }
  showInfo (index, txid) {
    this.show[index] = !this.show[index];
    if (this.show[index]) {
      this.getTransferByTxid(index, txid);
      this.getNep5TransferByTxid(index, txid);
    }
  }
  // showAllTrans() {
  //   this.getTxByHeight(1, this.transTotal);
  //   this.isVisible = true;
  // }
  onpageGo(num: number) {
    this.initShow();
    this.getTxByHeight(num, this.pageSize);
  }
}
