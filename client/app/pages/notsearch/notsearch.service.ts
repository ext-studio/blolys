import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/publish';
import 'rxjs/operators/refCount';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class NotsearchService {
  private $condition: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }
  public Condition(hash): Observable<any> {
    this.checkcondition(hash);
    return this.$condition.publish().refCount();
  }
  public checkcondition(hash) {
    this.http.post(`${this.global.apiDomain}/api/index`,
      { 'method': 'checkcondition', 'params': [hash] }).subscribe((res: any) => {
      this.$condition.next(res);
    }, (err) => {
      console.log(err);
    });
  }

}
