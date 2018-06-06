import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AddressService } from '../address.service';
import { TransactionService } from '../../transaction/transaction.service';
import { Subscription } from 'rxjs/Subscription';
import { GlobalService } from '../../../core';

@Component({
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss']
})
export class AddressInfoComponent implements OnInit, OnDestroy {
  addrTransactions: any = [];
  transfer: any = [];
  transferType: any = [];
  addrAssets: any = ['0'];
  transTotal: Number = 0;
  show: any = [];
  isVisible: Boolean = false;
  address: String = this.router.url.split('/')[3];
  pageIndex: any = 0;
  pageSize: any = 5;
  pageLength: any = 0;
  isProgress: Boolean = true;
  apiDo: String;
  netDo: String;

  routerSub: Subscription = null;
  addrAssetsSub: Subscription = null;
  txByAddrSub: Subscription = null;
  transferByTxidSub: Subscription = null;
  nep5TransferByTxidSub: Subscription = null;

  constructor(
    private router: Router,
    private addressService: AddressService,
    private transactionService: TransactionService,
    private global: GlobalService
  ) { }

  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    if (this.addrAssetsSub) {
      this.addrAssetsSub.unsubscribe();
    }
    if (this.txByAddrSub) {
      this.txByAddrSub.unsubscribe();
    }
    if (this.transferByTxidSub) {
      this.transferByTxidSub.unsubscribe();
    }
    if (this.nep5TransferByTxidSub) {
      this.nep5TransferByTxidSub.unsubscribe();
    }
  }
  ngOnInit() {
    this.netDo = this.router.url.split('/')[1];
    if (this.global.net === 'mainnet') {
      this.apiDo = this.global.apiDomain;
    } else {
      this.apiDo = this.global.teApiDomain;
    }
    this.getAddrAssets();
    this.routerSub = this.router.events.subscribe((res: RouterEvent) => {
      if (res instanceof NavigationEnd) {
        if (this.address !== res.url.split('/')[3]) {
          this.address = res.url.split('/')[3];
          this.getAddrAssets();
          this.onpageGo(1);
        }
      }
    });
  }
  initShow () {
    for (let i = 0; i < this.pageSize; i++) {
      this.show[i] = false;
      this.transfer[i] = -1;
      this.transferType[i] = -1;
    }
  }
  showInfo (index, txid) {
    this.show[index] = !this.show[index];
    if (this.show[index] && this.transfer[index] === -1) {
      this.transfer[index] = '';
      this.getTransferByTxid(index, txid);
      this.getNep5TransferByTxid(index, txid);
    }
  }
  // showAllTrans () {
  //   this.getTxByAddr(1, this.transTotal);
  //   this.isVisible = true;
  // }
  getAddrAssets () {
    this.addrAssetsSub = this.addressService.AddrAssets(this.apiDo, this.address).subscribe((res: any) => {
      if (res.code === 200) {
        this.addrAssets = this.balanceFilter(res.result);
      } else if (res.code === 1000) {
        this.addrAssets = [];
      } else {
        this.addrAssets = ['0'];
      }
    });
  }
  getTxByAddr (pageIndex, pageSize) {
    this.addrTransactions = [];
    this.isProgress = true;
    this.txByAddrSub = this.addressService.TxByAddr(this.apiDo, pageIndex, pageSize, this.address).subscribe((res: any) => {
      if (res.result) {
        this.addrTransactions = res.result.data;
        this.transTotal = res.result.total;
        this.pageLength = Math.ceil(res.result.total / this.pageSize);
        this.isProgress = false;
      } else {
        this.addrTransactions = false;
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
  balanceFilter(balance) { // remove balance = 0
    let target: any, j = 0;
    target = [];
    for (let i = 0; i < balance.length; i++) {
      if (balance[i].balance !== '0') {
        target[j++] = balance[i];
      }
    }
    return target;
  }
  onpageGo(num: number) {
    this.initShow();
    this.getTxByAddr(num, this.pageSize);
  }
}
