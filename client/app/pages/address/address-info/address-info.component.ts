import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from '../address.service';
import { TransactionService } from '../../transaction/transaction.service';

@Component({
  templateUrl: './address-info.component.html',
  styleUrls: ['./address-info.component.scss']
})
export class AddressInfoComponent implements OnInit {
  addrTransactions: any;
  transfer: any = [];
  transferType: any = [];
  addrAssets: any;
  transTotal: Number = 0;
  show: any = [];
  isVisible: Boolean = false;
  pageSize: Number = 5;
  address: String = this.router.url.split('/')[2];

  constructor(
    private router: Router,
    private addressService: AddressService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.getTxByAddr(1, this.pageSize);
    this.getAddrAssets();
  }
  initShow () {
    for (let i = 0; i < this.transTotal; i++) {
      this.show[i] = false;
      this.transfer[i] = '';
      this.transferType[i] = -1;
    }
  }
  showInfo (index, txid) {
    this.show[index] = !this.show[index];
    this.getTransferByTxid(index, txid);
    this.getNep5TransferByTxid(index, txid);
  }
  showAllTrans () {
    this.getTxByAddr(1, this.transTotal);
    this.isVisible = true;
  }
  gotoAddr (address: string) {
    this.address = address;
    this.isVisible = false;
    this.getAddrAssets();
    this.getTxByAddr(1, this.pageSize);
  }
  getAddrAssets () {
    this.addressService.AddrAssets(this.address).subscribe((res: any) => {
      if (res.result) {
        this.addrAssets = res.result;
      }
    });
  }
  getTxByAddr (pageIndex, pageSize) {
    this.addressService.TxByAddr(pageIndex, pageSize, this.address).subscribe((res: any) => {
      if (res.result) {
        this.addrTransactions = res.result.data;
        this.transTotal = res.result.total;
        this.initShow();
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
}
