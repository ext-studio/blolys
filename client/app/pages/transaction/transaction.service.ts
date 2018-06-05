import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TransactionService {
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }
  public TransferByTxid(index, txid): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'gettransferbytxid', 'params': [txid] });
  }
  public Nep5TransferByTxid(index, txid): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'getnep5transferbytxid', 'params': [txid] });
  }
  public Trans(pageIndex, pageSize, transType): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'gettransactions', 'params': [pageIndex, pageSize, transType] });
  }
  public TxbyTxid(txid): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/transactions`,
      {'method': 'gettxbytxid', 'params': [txid]});
  }
  public Script(txid): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/transactions`,
      {'method': 'getscripts', 'params': [txid]});
  }
}
