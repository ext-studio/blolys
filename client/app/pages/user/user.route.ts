import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAuthGuard } from '../../core';

import { UserComponent } from './user.component';
import { AssetsComponent } from './assets/assets.component'

const routes: Routes = [
    { 
        path: '', 
        component: UserComponent,
        children: [
            { path: 'assets', component: AssetsComponent }
            // { path: '', component: UserComponent }
        ] 
    },
    { path: 'home', component: UserComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule { }

export const routedComponents = [UserComponent];
