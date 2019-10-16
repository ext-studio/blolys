import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotsearchComponent } from './notsearch.component';

const routes: Routes = [
    {
        path: 'mainnet',
        children: [{ path: 'search/:id', component: NotsearchComponent }]
    },
    {
        path: 'testnet',
        children: [{ path: 'search/:id', component: NotsearchComponent }]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NotsearchRoutingModule {}
