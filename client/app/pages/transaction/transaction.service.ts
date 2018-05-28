import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/publish';
import 'rxjs/operators/refCount';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TransactionService {
  private $transfer: Subject<any> = new Subject<any>();
  private $transaction: Subject<any> = new Subject<any>();
  private $txInfo: Subject<any> = new Subject<any>();
  private $script: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }
  public TransferByTxid(txid): Observable<any> {
    this.getTransferByTxid(txid);
    return this.$transfer.publish().refCount();
  }
  public Nep5TransferByTxid(txid): Observable<any> {
    this.getNep5TransferByTxid(txid);
    return this.$transfer.publish().refCount();
  }
  public Trans(pageIndex, pageSize, transType): Observable<any> {
    this.getTrans(pageIndex, pageSize, transType);
    return this.$transaction.publish().refCount();
  }
  public TxbyTxid(txid): Observable<any> {
    this.getTxbyTxid(txid);
    return this.$txInfo.publish().refCount();
  }
  public Script(txid): Observable<any> {
    this.getScript(txid);
    return this.$script.publish().refCount();
  }

  public getTransferByTxid (txid) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'gettransferbytxid', 'params': [txid] }).subscribe((res: any) => {
      if (res.code === 200 && res.result.TxUTXO != null && res.result.TxVouts != null) {
        this.$transfer.next(res);
      }
    }, (err) => {
      console.log(err);
    });
  }
  public getNep5TransferByTxid (txid) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'getnep5transferbytxid', 'params': [txid] }).subscribe((res: any) => {
      if (res.code === 200 && res.result.length > 0) {
        this.$transfer.next(res);
      }
    }, (err) => {
      console.log(err);
    });
  }
  public getTrans (pageIndex, pageSize, transType) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'gettransactions', 'params': [pageIndex, pageSize, transType] }).subscribe((res: any) => {
      if (res.code === 200) {
        this.$transaction.next(res);
      }
    }, (err) => {
      console.log(err);
    });
  }
  public getTxbyTxid(txid) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      {'method': 'gettxbytxid', 'params': [txid]}).subscribe((res: any) => {
      if (res.code === 200) {
        this.$txInfo.next(res);
      }
    }, (err) => {
      console.log(err);
    });
  }
  public getScript(txid) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
    {'method': 'getscripts', 'params': [txid]}).subscribe((res: any) => {
      if (res.code === 200) {
        this.$script.next(res);
      }
  }, (err) => {
    console.log(err);
  });
  }
}
