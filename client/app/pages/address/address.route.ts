import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddressesComponent } from './addresses/addresses.component';
import { AddressInfoComponent } from './address-info/address-info.component';

const routes: Routes = [
    {
        path: 'mainnet',
        children: [
            { path: 'addresses/page/:page', component: AddressesComponent },
            { path: 'address/:id/page/:page', component: AddressInfoComponent }
        ]
    },
    {
        path: 'testnet',
        children: [
            { path: 'addresses/page/:page', component: AddressesComponent },
            { path: 'address/:id/page/:page', component: AddressInfoComponent }
        ]
    }
];

@NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
})
export class AddressRoutingModule { }
