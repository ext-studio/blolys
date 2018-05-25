import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { HomeComponent } from './home/home.component';
import { AssetsComponent } from './assets/assets.component';
import { BlocksComponent } from './blocks/blocks.component';
import { AddressesComponent } from './addresses/addresses.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AddressInfoComponent } from './address-info/address-info.component';
import { AssetInfoComponent } from './asset-info/asset-info.component';
import { BlockInfoComponent } from './block-info/block-info.component';
import { TransactionInfoComponent } from './transaction-info/transaction-info.component';
import { NotsearchComponent } from './notsearch/notsearch.component';

const routes: Routes = [
  // {
  //   path: '', redirectTo: 'mainnet', pathMatch: 'full'
  // },
  {
    path: '',
    component: UserComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'home', component: HomeComponent },
      { path: 'assets', component: AssetsComponent },
      { path: 'asset/:name', component: AssetInfoComponent },
      { path: 'nep5/:name', component: AssetInfoComponent },
      { path: 'blocks', component: BlocksComponent },
      { path: 'block/:index', component: BlockInfoComponent },
      { path: 'addresses', component: AddressesComponent },
      { path: 'address/:address', component: AddressInfoComponent },
      { path: 'transactions', component: TransactionsComponent },
      { path: 'transaction/:txid', component: TransactionInfoComponent },
      { path: 'search/:id', component: NotsearchComponent}
    ]
  }
  // {
  //   path: 'testnet',
  //   component: UserComponent,
  //   children: [
  //     { path: '', component: HomeComponent },
  //     { path: 'home', component: HomeComponent },
  //     { path: 'assets', component: AssetsComponent },
  //     { path: 'asset/:name', component: AssetInfoComponent },
  //     { path: 'nep5/:name', component: AssetInfoComponent },
  //     { path: 'blocks', component: BlocksComponent },
  //     { path: 'block/:index', component: BlockInfoComponent },
  //     { path: 'addresses', component: AddressesComponent },
  //     { path: 'address/:address', component: AddressInfoComponent },
  //     { path: 'transactions', component: TransactionsComponent },
  //     { path: 'transaction/:txid', component: TransactionInfoComponent },
  //     { path: 'search/:id', component: NotsearchComponent}
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }

export const routedComponents = [UserComponent];
