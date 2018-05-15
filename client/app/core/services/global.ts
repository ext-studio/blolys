import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  // public apiDomain: String = 'http://192.168.1.39:8080';
  // public apiDomain: String = 'http://192.168.1.39:7001';
  public apiDomain: String = 'http://192.168.1.90:8080';
  // public apiDomain: String = 'http://149.28.17.215:8080';
  // public apiDomain: string = 'https://user.ext.earth';
  constructor() { }
}
