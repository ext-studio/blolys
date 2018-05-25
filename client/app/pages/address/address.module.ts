import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { AddressRoutingModule } from './address.route';

import { AddressesComponent } from './addresses/addresses.component';
import { AddressInfoComponent } from './address-info/address-info.component';

@NgModule({
  imports: [
    CommonModule, SharedModule, AddressRoutingModule
  ],
  declarations: [AddressesComponent, AddressInfoComponent]
})
export class AddressModule { }
