import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared';

import { AddressesComponent } from './addresses/addresses.component';
import { AddressInfoComponent } from './address-info/address-info.component';

const routes: Routes = [
  { path: 'addresses', component: AddressesComponent },
  { path: 'address/:id', component: AddressInfoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AddressRoutingModule { }
