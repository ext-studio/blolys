import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NotsearchService {
    constructor(
        private http: HttpClient,
    ) { }
    public Condition(apiDo, hash): Observable<any> {
        return this.http.post(`${apiDo}/api/index`,
            { 'method': 'checkcondition', 'params': [hash] });
    }
}
