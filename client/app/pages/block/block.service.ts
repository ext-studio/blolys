import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/publish';
import 'rxjs/operators/refCount';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BlockService {
  private $block: Subject<any> = new Subject<any>();
  private $totalBlock: Subject<any> = new Subject<any>();
  private $blockTransaction: Subject<any> = new Subject<any>();
  private $blockInfo: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  public Block(pageIndex, pageSize): Observable<any> {
    this.getBlock(pageIndex, pageSize);
    return this.$block.publish().refCount();
  }
  public Allcounts(): Observable<any> {
    this.queryallcounts();
    return this.$totalBlock.publish().refCount();
  }
  public TxByHeight(pageIndex, pageSize, height): Observable<any> {
    this.getTxByHeight(pageIndex, pageSize, height);
    return this.$blockTransaction.publish().refCount();
  }
  public BlockByHeight(height): Observable<any> {
    this.getBlockByHeight(height);
    return this.$blockInfo.publish().refCount();
  }

  public getBlock(pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/block`,
      { 'method': 'getblocks', 'params': [pageIndex, pageSize] }).subscribe((res: any) => {
      if (res.code === 200) {
        this.$block.next(res);
      }
    }, (err) => {
      console.log(err);
    });
  }
  public queryallcounts() {
    this.http.post(`${this.global.apiDomain}/api/index`,
      { 'method': 'queryallcounts' }).subscribe((res: any) => {
      if (res.code === 200) {
        this.$totalBlock.next(res);
      }
    }, (err) => {
      console.log(err);
    });
  }
  public getTxByHeight(pageIndex, pageSize, height) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'gettxbyheight', 'params': [pageIndex, pageSize, height] }).subscribe((res: any) => {
      if (res.code === 200) {
        this.$blockTransaction.next(res);
      }
    }, (err) => {
      console.log(err);
    });
  }
  public getBlockByHeight(height) {
    this.http.post(`${this.global.apiDomain}/api/block`,
      { 'method': 'getblockbyheight', 'params': [height]} ).subscribe((res: any) => {
      if (res.code === 200) {
        this.$blockInfo.next(res);
      }
    }, (err) => {
      console.log(err);
    });
  }
}
