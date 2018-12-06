import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
    // public apiDomain: String = 'http://192.168.1.39:8080';  // Mainnet
    // public apiDotest: String = 'http://192.168.1.39:8002';  // Testnet
    public apiDomain: String = 'https://api.iwallic.forchain.info';
    public apiDotest: String = 'https://api.iwallic.forchain.info';
    // public apiDomain: String = 'http://149.28.17.215:8080';
    public netDomain: String = 'mainnet';
    public netDotest: String = 'mainnet';
    constructor() { }
}
