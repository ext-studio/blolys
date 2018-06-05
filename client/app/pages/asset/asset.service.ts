import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AssetService {
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }
  public Assets(pageIndex, pageSize): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/asset`,
      { 'method': 'getallassets', 'params': [pageIndex, pageSize] });
  }
  // public Nep5Assets(pageIndex, pageSize): Observable<any> {
  //   return this.http.post(`${this.global.apiDomain}/api/asset`,
  //     { 'method': 'getnep5assets', 'params': [pageIndex, pageSize] });
  // }
  public AssetInfo(assetId): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/asset`,
      {'method': 'getassetinfo', 'params': [assetId]});
  }
  public Nep5Info(assetId): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/asset`,
      {'method': 'getnep5info', 'params': [assetId]});
  }
  public AddrByAssetid(pageIndex, pageSize, assetId): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/address`,
      { 'method': 'getaddrbyassetid', 'params': [pageIndex, pageSize, assetId] });
  }
  public RankByAssetid(pageIndex, pageSize, assetId): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/address`,
      { 'method': 'getrankbyassetid', 'params': [pageIndex, pageSize, assetId] });
  }
  public Nep5RegisterInfo(id): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/asset`,
      {'method': 'getnep5registerinfo', 'params': [id]});
  }
}
