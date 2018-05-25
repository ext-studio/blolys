import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  // public apiDomain: String = 'http://192.168.1.39:8001';  // Mainnet
  public apiDomain: String = 'http://192.168.1.39:8002';  // Testnet
  // public apiDomain: String = 'http://47.75.174.167:8001';
  // public apiDomain: String = 'http://192.168.1.90:8080';
  // public apiDomain: String = 'http://149.28.17.215:8080';
  constructor() { }
}
