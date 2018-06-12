import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotsearchService {
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }
  public Condition(apiDo, hash): Observable<any> {
    return this.http.post(`${apiDo}/api/index`,
      { 'method': 'checkcondition', 'params': [hash] });
  }
}
