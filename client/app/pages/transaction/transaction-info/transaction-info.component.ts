import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { TransactionService } from '../transaction.service';
import { Subscription } from 'rxjs/Subscription';
import { GlobalService } from '../../../core';

@Component({
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.scss']
})
export class TransactionInfoComponent implements OnInit, OnDestroy {
  transfer: any = [];
  transferType: Number = -1;
  txInfo: any = [];
  scripts: any = {};
  txid: String = this.router.url.split('/')[3];
  apiDo: String;
  netDo: String;

  routerSub: Subscription = null;
  txbyTxidSub: Subscription = null;
  scriptSub: Subscription = null;
  transferByTxidSub: Subscription = null;
  nep5TransferByTxidSub: Subscription = null;

  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private global: GlobalService
  ) { }

  ngOnInit() {
    this.netDo = this.router.url.split('/')[1];
    if (this.global.net === 'mainnet') {
      this.apiDo = this.global.apiDomain;
    } else {
      this.apiDo = this.global.teApiDomain;
    }
    this.initPage();
    this.routerSub = this.router.events.subscribe((res: RouterEvent) => {
      if (res instanceof NavigationEnd) {
        if (this.txid !== res.url.split('/')[3]) {
          this.txid = res.url.split('/')[3];
          this.initPage();
        }
      }
    });
  }
  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    if (this.txbyTxidSub) {
      this.txbyTxidSub.unsubscribe();
    }
    if (this.scriptSub) {
      this.scriptSub.unsubscribe();
    }
    if (this.transferByTxidSub) {
      this.transferByTxidSub.unsubscribe();
    }
    if (this.nep5TransferByTxidSub) {
      this.nep5TransferByTxidSub.unsubscribe();
    }
  }
  initPage() {
    this.transfer = [];
    this.transferType = -1;
    this.txInfo = [];
    this.scripts = {};
    this.txbyTxidSub = this.transactionService.TxbyTxid(this.apiDo, this.txid).subscribe((res: any) => {
      if (res.result) {
        this.txInfo = res.result;
      }
    });
    this.scriptSub = this.transactionService.Script(this.apiDo, this.txid).subscribe((res: any) => {
      if (res.result) {
        this.scripts = res.result;
      }
    });
    this.transferByTxidSub = this.transactionService.TransferByTxid(this.apiDo, this.txid).subscribe((res: any) => {
      if (res.code === 200) {
        if (res.result.TxUTXO != null && res.result.TxVouts != null) {
          this.transfer = res.result;
          this.transferType = 0;
        }
      }
    });
    this.nep5TransferByTxidSub = this.transactionService.Nep5TransferByTxid(this.apiDo, this.txid).subscribe((res: any) => {
      if (res.code === 200) {
        if (res.result.length > 0) {
          this.transfer = res.result;
          this.transferType = 1;
        }
      }
    });
  }
}
