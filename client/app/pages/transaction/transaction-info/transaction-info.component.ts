import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { TransactionService } from '../transaction.service';

@Component({
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss']
})
export class TransactionInfoComponent implements OnInit {
  transfer: any = [];
  transferType: Number = -1;
  txInfo: any = [];
  scripts: any = {};
  txid: String = this.router.url.split('/')[2];

  constructor(
    private router: Router,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.initPage();
    this.router.events.subscribe((res: RouterEvent) => {
      if (res instanceof NavigationEnd) {
        if (res.url.indexOf('/transaction/') >= 0) {
          if (this.txid !== res.url.split('/')[2]) {
            this.txid = res.url.split('/')[2];
            this.initPage();
          }
        }
      }
    });
  }
  initPage() {
    this.transfer = [];
    this.transferType = -1;
    this.txInfo = [];
    this.scripts = {};
    this.transactionService.TxbyTxid(this.txid).subscribe((res: any) => {
      if (res.result) {
        this.txInfo = res.result;
      }
    });
    this.transactionService.Script(this.txid).subscribe((res: any) => {
      if (res.result) {
        this.scripts = res.result;
      }
    });
    this.transactionService.TransferByTxid('1', this.txid).subscribe((res: any) => {
      if (res.code === 200) {
        if (res.result.TxUTXO != null && res.result.TxVouts != null) {
          this.transfer = res.result;
          this.transferType = 0;
        }
      }
    });
    this.transactionService.Nep5TransferByTxid('1', this.txid).subscribe((res: any) => {
      if (res.code === 200) {
        if (res.result.length > 0) {
          this.transfer = res.result;
          this.transferType = 1;
        }
      }
    });
  }
}
