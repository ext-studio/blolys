import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { UserRoutingModule } from './user.route';
import { UserComponent } from './user.component';
import { AssetsComponent } from './assets/assets.component'

@NgModule({
    imports: [SharedModule, UserRoutingModule],
    exports: [],
    declarations: [
        UserComponent, AssetsComponent
    ],
    providers: [],
})
export class UserModule { }
