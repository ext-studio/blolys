import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class GlobalService {
    public apiDomain = 'https://mainnet.api.blolys.com';
    public apiDotest = 'https://testnet.api.blolys.com';
    public netDomain = 'mainnet';
    public netDotest = 'testnet';

    public NotFoundSource = new Subject();
    public NotFoundSub$ = this.NotFoundSource.asObservable();

    constructor() {}

    public pushNotFound() {
        this.NotFoundSource.next('404');
    }
}
