import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  // public apiDomain: String = 'http://192.168.1.39:8001';  // Mainnet
  // public apiDotest: String = 'http://192.168.1.39:8002';  // Testnet
  public apiDomain: String = 'https://api.blolys.com';
  // public apiDomain: String = 'http://192.168.1.90:8080';
  // public apiDomain: String = 'http://149.28.17.215:8080';
  constructor() { }
}
