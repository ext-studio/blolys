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
  public Assets(apiDo, pageIndex, pageSize): Observable<any> {
    return this.http.post(`${apiDo}/api/asset`,
      { 'method': 'getallassets', 'params': [pageIndex, pageSize] });
  }
  // public Nep5Assets(pageIndex, pageSize): Observable<any> {
  //   return this.http.post(`${apiDo}/api/asset`,
  //     { 'method': 'getnep5assets', 'params': [pageIndex, pageSize] });
  // }
  public AssetInfo(apiDo, assetId): Observable<any> {
    return this.http.post(`${apiDo}/api/asset`,
      {'method': 'getassetinfo', 'params': [assetId]});
  }
  public Nep5Info(apiDo, assetId): Observable<any> {
    return this.http.post(`${apiDo}/api/asset`,
      {'method': 'getnep5info', 'params': [assetId]});
  }
  public AddrByAssetid(apiDo, pageIndex, pageSize, assetId): Observable<any> {
    return this.http.post(`${apiDo}/api/address`,
      { 'method': 'getaddrbyassetid', 'params': [pageIndex, pageSize, assetId] });
  }
  public RankByAssetid(apiDo, pageIndex, pageSize, assetId): Observable<any> {
    return this.http.post(`${apiDo}/api/address`,
      { 'method': 'getrankbyassetid', 'params': [pageIndex, pageSize, assetId] });
  }
  public Nep5RegisterInfo(apiDo, id): Observable<any> {
    return this.http.post(`${apiDo}/api/asset`,
      {'method': 'getnep5registerinfo', 'params': [id]});
  }
}
