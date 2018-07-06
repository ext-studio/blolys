import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './notfound.component';

const routes: Routes = [
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [NotFoundComponent]
})
export class NotFoundModule { }

export const routedComponents = [NotFoundComponent];
