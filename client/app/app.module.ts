import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core';
import { AppRoutingModule } from './app.route';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home';

import { NotFoundModule } from './pages/notfound';
import { SharedModule } from './shared';
import { NotsearchModule } from './pages/notsearch';
import { AddressModule } from './pages/address';
import { BlockModule } from './pages/block';
import { AssetModule } from './pages/asset';
import { TransactionModule } from './pages/transaction';

@NgModule({
    declarations: [AppComponent, HomeComponent],
    imports: [
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        CoreModule,
        AddressModule,
        BlockModule,
        AssetModule,
        TransactionModule,
        NotsearchModule,
        NotFoundModule // NotFoundModule must placed at the end
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
