import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

import { BlockService } from '../block.service';
import { TransactionService } from '../../transaction/transaction.service';

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
          }
        }
      }
    });
  }
  initPage() {
    this.initShow();
    this.isVisible = false;
    this.blockService.Allcounts().subscribe((res: any) => {
      if (res.result) {
        this.totalBlocks = res.result.blockCounts ;
      }
    });
    this.getBlockByHeight();
    this.getTxByHeight(1, this.pageSize);
  }
  initShow () {
    for (let i = 0; i < this.transTotal; i++) {
      this.show[i] = false;
      this.transfer[i] = '';
      this.transferType[i] = -1;
    }
  }
  getTxByHeight(pageIndex, pageSize) {
    this.blockService.TxByHeight(pageIndex, pageSize, this.height).subscribe((res: any) => {
      if (res.result) {
        this.blockTransactions = res.result.data;
        this.transTotal = res.result.total;
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
      if (res.result.TxUTXO != null || res.result.TxVouts != null) {
        this.transfer[res.index] = res.result;
        this.transferType[res.index] = 0;
      }
    });
  }
  getNep5TransferByTxid (index, txid) {
    this.transactionService.Nep5TransferByTxid(index, txid).subscribe((res: any) => {
      if (res.result.length > 0) {
        this.transfer[res.index] = res.result;
        this.transferType[res.index] = 1;
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
  showAllTrans() {
    this.getTxByHeight(1, this.transTotal);
    this.isVisible = true;
  }
}
