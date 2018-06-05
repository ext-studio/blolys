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
  public Condition(hash): Observable<any> {
    return this.http.post(`${this.global.apiDomain}/api/index`,
      { 'method': 'checkcondition', 'params': [hash] });
  }
}
