import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  constructor() { }
  public get(key: string): any {
    let tryGet = window.localStorage.getItem(key) || 'null';
    return JSON.parse(tryGet);
  }
  public set(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  public remove(key: string) {
    window.localStorage.removeItem(key);
  }
  /**
   * First determine the current login role and obtain token
   * unauth Not logged in
   * expired time out
   * {ID, Token, Expired} success
   */
  public getAuth(): {
    Token: string,
    Expired: number,
    ID: number
  } | string {
    let role = this.get('role');
    if (!role) {
      return 'unauth';
    }
    let tryGet = this.get(`auth_${role}`);
    if (!tryGet || !tryGet['Token']) {
      return 'unauth';
    }
    if (tryGet['Expired'] * 1000 < new Date().getTime()) {
      return 'expired';
    }
    return tryGet;
  }
  public setAuth(role, data) {
    this.set('role', role);
    this.set(`auth_${role}`, data);
  }
  public clearAuth(role: string) {
    this.remove(`auth_${role}`);
  }
}