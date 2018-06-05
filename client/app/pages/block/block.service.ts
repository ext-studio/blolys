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

  public Block(pageIndex, pageSize): Observable<any> {
    return  this.http.post(`${this.global.apiDomain}/api/block`,
      { 'method': 'getblocks', 'params': [pageIndex, pageSize] });
  }
  public Allcounts(): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/index`,
      { 'method': 'queryallcounts' });
  }
  public TxByHeight(pageIndex, pageSize, height): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'gettxbyheight', 'params': [pageIndex, pageSize, height] });
  }
  public BlockByHeight(height): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/block`,
      { 'method': 'getblockbyheight', 'params': [height]} );
  }
}
