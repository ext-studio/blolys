import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { GlobalService } from './services/global';

/**
 * auth guard
 * http
 */

@NgModule({
  imports: [
    HttpClientModule, BrowserAnimationsModule
  ],
  exports: [],
  providers: [GlobalService]
})
export class CoreModule { }
