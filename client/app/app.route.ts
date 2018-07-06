import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home';

const routes: Routes = [
    // { path: '', component: HomeComponent },
    // { path: 'home', component: HomeComponent }
    { path: 'mainnet', component: HomeComponent },
    { path: 'testnet', component: HomeComponent },
    { path: '', redirectTo: 'mainnet', pathMatch: 'full' },
    {
        path: 'mainnet',
        children: [
            { path: 'home', component: HomeComponent }
        ]
    },
    {
        path: 'testnet',
        children: [
            { path: 'home', component: HomeComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [AppComponent];
