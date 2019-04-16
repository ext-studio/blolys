import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
    public apiDomain = 'https://mainnet.api.blolys.com';
    public apiDotest = 'https://testnet.api.blolys.com';
    public netDomain = 'mainnet';
    public netDotest = 'testnet';
    constructor() { }
}
