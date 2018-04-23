import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserAuthGuard } from './core';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home';
import { UserComponent } from './pages/user/user.component'

const routes: Routes = [
    { path: '', component: UserComponent }
    // { path: '', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule],
})
export class AppRoutingModule { }

export const routedComponents = [AppComponent];
