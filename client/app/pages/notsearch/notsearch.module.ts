import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { NotsearchRoutingModule } from './notsearch.route';

import { NotsearchComponent } from './notsearch.component';

@NgModule({
  imports: [
    CommonModule, SharedModule, NotsearchRoutingModule
  ],
  declarations: [NotsearchComponent]
})
export class NotsearchModule { }
