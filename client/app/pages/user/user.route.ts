import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserAuthGuard } from '../../core';

import { UserComponent } from './user.component';
import { AssetsComponent } from './assets/assets.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    { 
        path: '', 
        component: UserComponent,
        children: [
            { path: '', component: HomeComponent },
            { path: 'home', component: HomeComponent },
            { path: 'assets', component: AssetsComponent },
        ] 
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule { }

export const routedComponents = [UserComponent];
