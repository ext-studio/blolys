import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotsearchComponent } from './notsearch.component';

const routes: Routes = [
  { path: 'search/:id', component: NotsearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotsearchRoutingModule { }
