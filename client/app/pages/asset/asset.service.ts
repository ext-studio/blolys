import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/publish';
import 'rxjs/operators/refCount';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AssetService {
  private $asset: Subject<any> = new Subject<any>();
  private $nep5Asset: Subject<any> = new Subject<any>();
  private $assetInfo: Subject<any> = new Subject<any>();
  private $recentAddress: Subject<any> = new Subject<any>();
  private $rankAddr: Subject<any> = new Subject<any>();
  private $assetRegisterInfo: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }
  public Assets(pageIndex, pageSize): Observable<any> {
    this.getAssets(pageIndex, pageSize);
    return this.$asset.publish().refCount();
  }
  public Nep5Assets(pageIndex, pageSize): Observable<any> {
    this.getNep5Assets(pageIndex, pageSize);
    return this.$nep5Asset.publish().refCount();
  }
  public AssetInfo(assetId): Observable<any> {
    this.getAssetInfo(assetId);
    return this.$assetInfo.publish().refCount();
  }
  public Nep5Info(assetId): Observable<any> {
    this.getNep5Info(assetId);
    return this.$assetInfo.publish().refCount();
  }
  public AddrByAssetid(pageIndex, pageSize, assetId): Observable<any> {
    this.getAddrByAssetid(pageIndex, pageSize, assetId);
    return this.$recentAddress.publish().refCount();
  }
  public RankByAssetid(pageIndex, pageSize, assetId): Observable<any> {
    this.getRankByAssetid(pageIndex, pageSize, assetId);
    return this.$rankAddr.publish().refCount();
  }
  public Nep5RegisterInfo(id): Observable<any> {
    this.getNep5RegisterInfo(id);
    return this.$assetRegisterInfo.publish().refCount();
  }

  public getAssets(pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/asset`,
      { 'method': 'getassets', 'params': [pageIndex, pageSize] }).subscribe((res: any) => {
      if (res.code === 200) {
        this.$asset.next(res);
      }
    }, (err) => {
      console.log(err);
    });
  }
  public getNep5Assets(pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/asset`,
      { 'method': 'getnep5assets', 'params': [pageIndex, pageSize] }).subscribe((res: any) => {
        if (res.code === 200) {
          this.$nep5Asset.next(res);
        }
    }, (err) => {
      console.log(err);
    });
  }
  public getAssetInfo(assetId) {
    this.http.post(`${this.global.apiDomain}/api/asset`,
        {'method': 'getassetinfo', 'params': [assetId]}).subscribe((res: any) => {
        if (res.code === 200) {
          this.$assetInfo.next(res);
        }
      }, (err) => {
        console.log(err);
      });
  }
  public getNep5Info(assetId) {
    this.http.post(`${this.global.apiDomain}/api/asset`,
        {'method': 'getnep5info', 'params': [assetId]}).subscribe((res: any) => {
        if (res.code === 200) {
          this.$assetInfo.next(res);
        }
      }, (err) => {
        console.log(err);
      });
  }
  public getNep5RegisterInfo(id) {
    this.http.post(`${this.global.apiDomain}/api/asset`,
      {'method': 'getnep5registerinfo', 'params': [id]}).subscribe((res: any) => {
      if (res.code === 200) {
        this.$assetRegisterInfo.next(res);
      }
    }, (err) => {
      console.log(err);
    });
  }
  getAddrByAssetid(pageIndex, pageSize, assetId) {
    this.http.post(`${this.global.apiDomain}/api/address`,
      { 'method': 'getaddrbyassetid', 'params': [pageIndex, pageSize, assetId] }).subscribe((res: any) => {
      if (res.code === 200) {
        this.$recentAddress.next(res);
      }
    }, (err) => {
      console.log(err);
    });
  }
  getRankByAssetid(pageIndex, pageSize, assetId) {
    this.http.post(`${this.global.apiDomain}/api/address`,
      { 'method': 'getrankbyassetid', 'params': [pageIndex, pageSize, assetId] }).subscribe((res: any) => {
      if (res.code === 200) {
        this.$rankAddr.next(res);
      }
    }, (err) => {
      console.log(err);
    });
  }
}
