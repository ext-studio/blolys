import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionInfoComponent } from './transaction-info/transaction-info.component';

const routes: Routes = [
  { path: 'transactions', component: TransactionsComponent },
  { path: 'transaction/:id', component: TransactionInfoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TransactionRoutingModule { }
