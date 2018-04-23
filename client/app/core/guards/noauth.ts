/**
 * Login interceptor, Prevents logged in users from entering
 * Check if there are any expired tokens in the local area
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
