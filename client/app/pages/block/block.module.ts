import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { BlockRoutingModule } from './block.route';
import { BlockService } from './block.service';

import { BlocksComponent } from './blocks/blocks.component';
import { BlockInfoComponent } from './block-info/block-info.component';

@NgModule({
    imports: [CommonModule, SharedModule, BlockRoutingModule],
    declarations: [BlocksComponent, BlockInfoComponent],
    providers: [BlockService]
})
export class BlockModule {}
