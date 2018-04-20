import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { AuthRoutingModule } from './auth.route';

import { AuthComponent } from './auth.component';

@NgModule({
    imports: [SharedModule, AuthRoutingModule],
    exports: [],
    declarations: [
        AuthComponent
    ],
    providers: [],
})
export class AuthModule { }