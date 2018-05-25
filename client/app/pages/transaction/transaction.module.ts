import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { TransactionRoutingModule } from './transaction.route';

import { TransactionsComponent } from './transactions/transactions.component';
import { TransactionInfoComponent } from './transaction-info/transaction-info.component';

@NgModule({
  imports: [
    CommonModule, SharedModule, TransactionRoutingModule
  ],
  declarations: [TransactionsComponent, TransactionInfoComponent]
})
export class TransactionModule { }
