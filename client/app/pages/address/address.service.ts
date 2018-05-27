import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

// import 'rxjs/add/observable/of';

@Injectable()
export class AddressService {

  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) {
    this.getAddresses();
  }
  public getAddresses(): Observable<any> {
    let temp: any = 0;
    this.http.post(`${this.global.apiDomain}/api/address`,
      { 'method': 'getaddresses', 'params': [1, 10] }).subscribe((res: any) => {
      if (res.code === 200) {
        temp =  res.result.total;
        console.log(temp);
      }
    }, (err) => {
      console.log(err);
    });
    return of(temp);
  }
}
