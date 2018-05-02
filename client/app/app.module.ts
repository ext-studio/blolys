import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core';
import { AppRoutingModule } from './app.route';
import { AppComponent } from './app.component';

import { UserModule } from './pages/user';
import { NotFoundModule } from './pages/notfound';
import { SharedModule } from './shared';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    UserModule,
    SharedModule,
    NotFoundModule // NotFoundModule must placed at the end
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
