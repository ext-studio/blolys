import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TransactionService {
  constructor(
    private http: HttpClient,
  ) { }
  public TransferByTxid(apiDo, txid): Observable<any> {
    return this.http.post(`${apiDo}/api/transactions`,
      { 'method': 'gettransferbytxid', 'params': [txid] });
  }
  public Nep5TransferByTxid(apiDo, txid): Observable<any> {
    return this.http.post(`${apiDo}/api/transactions`,
      { 'method': 'getnep5transferbytxid', 'params': [txid] });
  }
  public Trans(apiDo, pageIndex, pageSize, transType): Observable<any> {
    return this.http.post(`${apiDo}/api/transactions`,
      { 'method': 'gettransactions', 'params': [pageIndex, pageSize, transType] });
  }
  public TxbyTxid(apiDo, txid): Observable<any> {
    return this.http.post(`${apiDo}/api/transactions`,
      {'method': 'gettxbytxid', 'params': [txid]});
  }
  public Script(apiDo, txid): Observable<any> {
    return this.http.post(`${apiDo}/api/transactions`,
      {'method': 'getscripts', 'params': [txid]});
  }
}
