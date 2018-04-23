import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared';
import { UserRoutingModule } from './user.route';
import { UserComponent } from './user.component';
import { AssetsComponent } from './assets/assets.component';
import { HomeComponent } from './home/home.component'

@NgModule({
  imports: [SharedModule, UserRoutingModule],
  exports: [],
  declarations: [
    UserComponent, AssetsComponent, HomeComponent
  ],
  providers: [],
})
export class UserModule { }
