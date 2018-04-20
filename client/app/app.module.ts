import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared';
import { CoreModule } from './core';
import { AppRoutingModule } from './app.route';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home';

import { UserModule } from './pages/user';
import { AuthModule } from './pages/auth';
import { NotFoundModule } from './pages/notfound';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        SharedModule,
        AppRoutingModule,
        CoreModule,
        UserModule,
        AuthModule,
        NotFoundModule // NotFoundModule must placed at the end
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
