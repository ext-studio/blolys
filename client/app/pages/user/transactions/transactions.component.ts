import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../core';

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
    private http: HttpClient,
    private global: GlobalService,
  ) { }

  ngOnInit() { }
  initShow () {
    for (let i = 0; i < this.pageSize; i++) {
      this.show[i] = false;
      this.transfer[i] = '';
      this.transferType[i] = 0;
    }
  }
  getTrans (pageIndex, pageSize) {
    this.transactions = [];
    this.isProgress = true;
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'gettransactions', 'params': [pageIndex, pageSize, this.transType] }).subscribe((res: any) => {
      if (res.code === 200) {
        this.transactions = res.result.data;
        this.pageLength = Math.ceil(res.result.total / this.pageSize);
        this.isProgress = false;
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
