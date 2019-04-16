import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlocksComponent } from './blocks/blocks.component';
import { BlockInfoComponent } from './block-info/block-info.component';

const routes: Routes = [
    // { path: 'blocks', component: BlocksComponent },
    // { path: 'block/:id', component: BlockInfoComponent }
    {
        path: 'mainnet',
        children: [
            { path: 'blocks/page/:page', component: BlocksComponent },
            { path: 'block/:id', component: BlockInfoComponent },
        ]
    },
    // {
    //     path: 'testnet',
    //     children: [
    //         { path: 'blocks', component: BlocksComponent },
    //         { path: 'block/:id', component: BlockInfoComponent },
    //     ]
    // }
];

@NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
})
export class BlockRoutingModule { }
