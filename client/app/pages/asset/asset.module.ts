import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { AssetRoutingModule } from './asset.route';
import { AssetService } from './asset.service';

import { AssetsComponent } from './assets/assets.component';
import { AssetInfoComponent } from './asset-info/asset-info.component';

@NgModule({
  imports: [
    CommonModule, SharedModule, AssetRoutingModule
  ],
  declarations: [AssetsComponent, AssetInfoComponent],
  providers: [AssetService]
})
export class AssetModule { }
