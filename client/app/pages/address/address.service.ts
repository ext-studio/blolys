import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddressService {
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  public Addresses(pageIndex, pageSize): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/address`,
      { 'method': 'getaddresses', 'params': [pageIndex, pageSize] });
  }
  public TxByAddr(pageIndex, pageSize, address): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/transactions`,
      {'method': 'getpagetxbyaddress', 'params': [pageIndex, pageSize, address]});
  }
  public AddrAssets(address): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/asset`,
      {'method': 'getaddrassets', 'params': [address]});
  }
}
