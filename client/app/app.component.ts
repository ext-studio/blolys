import { Component, HostBinding, HostListener, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AlertComponent } from './shared';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-blolys',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isWide: Boolean = true;
  currentPage: String = this.router.url;
  dropContentOpened: Boolean = false;
  delanguage: String = '中文简体';
  denet: String = '主网';

  routerSub: Subscription = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
  ) {}
  public ngOnInit() {
    this.renderMenu();
    this.routerSub = this.router.events.subscribe((res: RouterEvent) => {
      if (res instanceof NavigationEnd) {
        this.currentPage = res.url;
      }
    });
    if (window.location.href.indexOf('en') >= 0) {
      this.delanguage = 'English';
      this.denet = 'MainNet';
    }
  }
  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
  @HostListener('window:resize') public onResize() {
    this.renderMenu();
  }
  private renderMenu() {
    if (window.innerWidth < 870 && this.isWide) {
      this.isWide = false;
      return;
    }
    if (window.innerWidth > 870 && !this.isWide) {
      this.isWide = true;
      return;
    }
  }
  alertDialog() {
    if (window.location.href.indexOf('en') >= 0) {
      this.dialog.open(AlertComponent,
        {data: {type: 'accent', title: 'Search error', body: 'coming soon...', ok: 'ok', no: 'cancel'}});
    } else {
      this.dialog.open(AlertComponent,
        {data: {type: 'accent', title: '错误', body: '即将到来', ok: '确认', no: '取消'}});
    }
  }
  changelang (lang) {
    let href, hrefstart, hrefend, targethref;
    href = window.location.href;
    if (lang === 'en' && href.indexOf('en') < 0) {
      hrefstart = href.substr(0, href.indexOf('#'));
      hrefend = href.substr(href.indexOf('#'), href.length);
      targethref = hrefstart.concat('en/');
      targethref = targethref.concat(hrefend);
      window.location.href = targethref;
    } else if (lang === 'cn' && href.indexOf('en') >= 0) {
      hrefstart = href.substr(0, href.indexOf('/en/#/'));
      hrefend = href.substr(href.indexOf('/#/'), href.length);
      targethref = hrefstart.concat(hrefend);
      window.location.href = targethref;
    }
  }
}
