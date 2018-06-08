import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../transaction.service';
import { Subscription } from 'rxjs/Subscription';
import { GlobalService } from '../../../core';

@Component({
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  transactions: any = [];
  transfer: any = [];
  transferType: any = [];
  show: any = [];
  transType: String = 'all';
  pageSize: any = 16;
  pageLength: number;
  pageIndex: any = 0;
  isProgress: Boolean = true;
  apiDo: String;
  netDo: String;

  transSub: Subscription = null;
  transferByTxidSub: Subscription = null;
  nep5TransferByTxidSub: Subscription = null;

  constructor(
    private transactionService: TransactionService,
    private global: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkLangNet();
  }
  ngOnDestroy() {
    if (this.transSub) {
      this.transSub.unsubscribe();
    }
    if (this.transferByTxidSub) {
      this.transferByTxidSub.unsubscribe();
    }
    if (this.nep5TransferByTxidSub) {
      this.nep5TransferByTxidSub.unsubscribe();
    }
  }
  checkLangNet() {
    if (this.router.url.indexOf('/testnet') < 0) {
      this.apiDo = this.global.apiDomain;
      this.netDo = this.global.netDomain;
    } else {
      this.apiDo = this.global.apiDotest;
      this.netDo = this.global.netDotest;
    }
  }
  initShow () {
    for (let i = 0; i < this.pageSize; i++) {
      this.show[i] = false;
      this.transfer[i] = -1;
      this.transferType[i] = -1;
    }
  }
  getTrans (pageIndex, pageSize) {
    this.transactions = [];
    this.isProgress = true;
    this.transSub = this.transactionService.Trans(this.apiDo, pageIndex, pageSize, this.transType).subscribe((res: any) => {
      if (res.code === 200) {
        if (res.result.total > 0) {
          this.transactions = res.result.data;
          this.pageLength = Math.ceil(res.result.total / this.pageSize);
          this.isProgress = false;
        }
      }
    });
  }
  getTransferByTxid (index, txid) {
    this.transferByTxidSub = this.transactionService.TransferByTxid(this.apiDo, txid).subscribe((res: any) => {
      if (res.code === 200) {
        if (res.result.TxUTXO != null || res.result.TxVouts != null) {
          this.transfer[index] = res.result;
          this.transferType[index] = 0;
        }
      }
    });
  }
  getNep5TransferByTxid (index, txid) {
    this.nep5TransferByTxidSub = this.transactionService.Nep5TransferByTxid(this.apiDo, txid).subscribe((res: any) => {
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
    if (this.show[index] && this.transfer[index] === -1) {
      this.transfer[index] = '';
      this.getTransferByTxid(index, txid);
      this.getNep5TransferByTxid(index, txid);
    }
  }
  changeTransType (type: string) {
    this.transType = type;
    this.pageIndex += 1;
    this.onpageGo(1);
  }
  onpageGo(num: number) {
    this.initShow();
    this.getTrans(num, this.pageSize);
  }
}
