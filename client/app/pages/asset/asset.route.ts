import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetsComponent } from './assets/assets.component';
import { AssetInfoComponent } from './asset-info/asset-info.component';

const routes: Routes = [
    {
        path: 'mainnet',
        children: [
            { path: 'assets/page/:page', component: AssetsComponent },
            { path: 'asset/:id/rank-bala/:balancePage/recent-addr/:addressPage', component: AssetInfoComponent },
            { path: 'nep5/:id/rank-bala/:balancePage/recent-addr/:addressPage', component: AssetInfoComponent }
        ]
    },
    // {
    //     path: 'testnet',
    //     children: [
    //         { path: 'assets', component: AssetsComponent },
    //         { path: 'asset/:id', component: AssetInfoComponent },
    //         { path: 'nep5/:id', component: AssetInfoComponent }
    //     ]
    // }
];

@NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule],
})
export class AssetRoutingModule { }
