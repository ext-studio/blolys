import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { StorageService } from '../services/storage';

@Injectable()
export class UserAuthGuard implements CanActivate {
    constructor(
        private storage: StorageService,
        private router: Router
    ) { }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let role = this.storage.get('role');
        let tryGet = this.storage.getAuth();
        if (role !== 'user' || tryGet === 'unauth' || tryGet === 'expired') {
            this.router.navigate([`/auth/${role || 'user'}`]);
            return false;
        }
        return true;
    }
}