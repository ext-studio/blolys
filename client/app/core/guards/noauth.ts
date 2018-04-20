/**
 * 登录拦截器 防止已登录用户进入
 * 检查本地是否有未过期token 存在则禁止进入
 */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../services/storage';

@Injectable()
export class NoAuthGuard implements CanActivate {
    constructor(
        private storage: StorageService,
        private router: Router
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let tryGet = this.storage.getAuth();
        // console.log(tryGet);
        if (tryGet === 'unauth' || tryGet === 'expired') {
            return true;
        }
        this.router.navigate([`/${this.storage.get('role') || 'user'}/home`]);
        return false;
    }
}
