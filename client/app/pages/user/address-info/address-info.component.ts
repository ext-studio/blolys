import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../core';
import { Router } from '@angular/router';

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
    private http: HttpClient,
    private global: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTxByAddr(1, this.pageSize);
    this.getAddrAssets();
  }
  initShow () {
    for (let i = 0; i < this.transTotal; i++) {
      this.show[i] = false;
      this.transfer[i] = '';
      this.transferType[i] = 0;
    }
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
  showAllTrans () {
    this.getTxByAddr(1, this.transTotal);
    this.isVisible = true;
  }
  getAddrAssets () {
    this.http.post(`${this.global.apiDomain}/api/asset`,
      {'method': 'getaddrassets', 'params': [this.address]}).subscribe((res: any) => {
      if (res.code === 200) {
        this.addrAssets = res.result;
      }
    }, (err) => {
      console.log(err);
    });
  }
  getTxByAddr (pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      {'method': 'getpagetxbyaddress', 'params': [pageIndex, pageSize, this.address]}).subscribe((res: any) => {
      if (res.code === 200) {
        this.addrTransactions = res.result.data;
        this.transTotal = res.result.total;
        this.initShow();
      }
    }, (err) => {
      console.log(err);
    });
  }
  gotoAddr (address: string) {
    this.address = address;
    this.isVisible = false;
    this.getAddrAssets();
    this.getTxByAddr(1, this.pageSize);
  }
}
