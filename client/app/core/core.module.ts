import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptor } from './services/interceptor';

import { AdminAuthGuard } from './guards/auth.admin';
import { UserAuthGuard } from './guards/auth.user';
import { NoAuthGuard } from './guards/noauth';
import { GlobalService } from './services/global';
import { StorageService } from './services/storage';

/**
 * auth guard
 * http
 */

@NgModule({
    imports: [
        HttpClientModule, BrowserAnimationsModule
    ],
    exports: [],
    providers: [
        AdminAuthGuard, UserAuthGuard, NoAuthGuard, GlobalService, StorageService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptor,
            multi: true
        }
    ],
})
export class CoreModule { }
