import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';

@Component({
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: any = [];
  transfer: any = [];
  transferType: any = [];
  show: any = [];
  transType: String = 'all';
  pageSize: any = 16;
  pageLength: number;
  pageIndex: any = 0;
  isProgress: Boolean = true;

  constructor(
    private transactionService: TransactionService
  ) { }

  ngOnInit() {}
  initShow () {
    for (let i = 0; i < this.pageSize; i++) {
      this.show[i] = false;
      this.transfer[i] = '';
      this.transferType[i] = -1;
    }
  }
  getTrans (pageIndex, pageSize) {
    this.transactions = [];
    this.isProgress = true;
    this.transactionService.Trans(pageIndex, pageSize, this.transType).subscribe((res: any) => {
      if (res.result) {
        this.transactions = res.result.data;
        this.pageLength = Math.ceil(res.result.total / this.pageSize);
        this.isProgress = false;
      }
    });
  }
  getTransferByTxid (index, txid) {
    this.transactionService.TransferByTxid(txid).subscribe((res: any) => {
      if (res.result.TxUTXO != null && res.result.TxVouts != null) {
        this.transfer[index] = res.result;
        this.transferType[index] = 0;
      }
    });
  }
  getNep5TransferByTxid (index, txid) {
    this.transactionService.Nep5TransferByTxid(txid).subscribe((res: any) => {
      if (res.result.length > 0) {
        this.transfer[index] = res.result;
        this.transferType[index] = 1;
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
