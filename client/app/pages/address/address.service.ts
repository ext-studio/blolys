import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/publish';
import 'rxjs/operators/refCount';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AddressService {
  private $address: Subject<any> = new Subject<any>();
  private $addrTransaction: Subject<any> = new Subject<any>();
  private $addrAsset: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  public Addresses(pageIndex, pageSize): Observable<any> {
    this.getAddresses(pageIndex, pageSize);
    return this.$address.publish().refCount();
  }
  public TxByAddr(pageIndex, pageSize, address): Observable<any> {
    this.getTxByAddr(pageIndex, pageSize, address);
    return this.$addrTransaction.publish().refCount();
  }
  public AddrAssets(address): Observable<any> {
    this.getAddrAssets(address);
    return this.$addrAsset.publish().refCount();
  }

  public getAddresses(pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/address`,
      { 'method': 'getaddresses', 'params': [pageIndex, pageSize] }).subscribe((res: any) => {
      if (res.code === 200) {
        this.$address.next(res);
      }
    }, (err) => {
      console.log(err);
    });
  }
  public getTxByAddr(pageIndex, pageSize, address) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      {'method': 'getpagetxbyaddress', 'params': [pageIndex, pageSize, address]}).subscribe((res: any) => {
      if (res.code === 200) {
        this.$addrTransaction.next(res);
      }
    }, (err) => {
      console.log(err);
    });
  }
  public getAddrAssets(address) {
    this.http.post(`${this.global.apiDomain}/api/asset`,
      {'method': 'getaddrassets', 'params': [address]}).subscribe((res: any) => {
      // if (res.code === 200) {
      this.$addrAsset.next(res);
      // }
    }, (err) => {
      console.log(err);
    });
  }
}
