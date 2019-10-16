import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AddressService {
    constructor(private http: HttpClient) {}

    public Addresses(apiDo, pageIndex, pageSize): Observable<any> {
        return this.http.post(`${apiDo}/api/address`, { method: 'getaddresses', params: [pageIndex, pageSize] });
    }
    public TxByAddr(apiDo, pageIndex, pageSize, address): Observable<any> {
        return this.http.post(`${apiDo}/api/transactions`, { method: 'getpagetxbyaddress', params: [pageIndex, pageSize, address] });
    }
    public AddrAssets(apiDo, address): Observable<any> {
        return this.http.post(`${apiDo}/api/asset`, { method: 'getaddrassets', params: [address] });
    }
}
