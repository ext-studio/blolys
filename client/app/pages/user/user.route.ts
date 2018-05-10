import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { HomeComponent } from './home/home.component';
import { AssetsComponent } from './assets/assets.component';
import { BlocksComponent } from './blocks/blocks.component';
import { AddressesComponent } from './addresses/addresses.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { BlockInfoComponent } from './block-info/block-info.component';
import { AddressInfoComponent } from './address-info/address-info.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'assets', component: AssetsComponent },
      { path: 'blocks', component: BlocksComponent },
      { path: 'block/:index', component: BlockInfoComponent },
      { path: 'addresses', component: AddressesComponent },
      { path: 'address/:address', component: AddressInfoComponent },
      { path: 'transactions', component: TransactionsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

export const routedComponents = [UserComponent];
