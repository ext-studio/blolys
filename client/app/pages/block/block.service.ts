import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BlockService {
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  public Block(apiDo, pageIndex, pageSize): Observable<any> {
    return  this.http.post(`${apiDo}/api/block`,
      { 'method': 'getblocks', 'params': [pageIndex, pageSize] });
  }
  public Allcounts(apiDo): Observable<any> {
    return this.http.post(`${apiDo}/api/index`,
      { 'method': 'queryallcounts' });
  }
  public TxByHeight(apiDo, pageIndex, pageSize, height): Observable<any> {
    return this.http.post(`${apiDo}/api/transactions`,
      { 'method': 'gettxbyheight', 'params': [pageIndex, pageSize, height] });
  }
  public BlockByHeight(apiDo, height): Observable<any> {
    return this.http.post(`${apiDo}/api/block`,
      { 'method': 'getblockbyheight', 'params': [height]} );
  }
}
