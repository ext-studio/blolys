import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { NotsearchRoutingModule } from './notsearch.route';
import { NotsearchService } from './notsearch.service';

import { NotsearchComponent } from './notsearch.component';

@NgModule({
    imports: [CommonModule, SharedModule, NotsearchRoutingModule],
    declarations: [NotsearchComponent],
    providers: [NotsearchService]
})
export class NotsearchModule {}
