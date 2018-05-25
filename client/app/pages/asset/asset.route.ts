import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssetsComponent } from './assets/assets.component';
import { AssetInfoComponent } from './asset-info/asset-info.component';

const routes: Routes = [
  { path: 'assets', component: AssetsComponent },
  { path: 'asset/:id', component: AssetInfoComponent },
  { path: 'nep5/:id', component: AssetInfoComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AssetRoutingModule { }
