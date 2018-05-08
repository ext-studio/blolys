import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {
  // public apiDomain: string = 'http://192.168.0.113:9999';
  public apiDomain: String = 'http://45.76.214.56:8080';
  // public apiDomain: string = 'https://user.ext.earth';
  constructor() { }
}
