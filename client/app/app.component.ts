import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AlertComponent } from './shared';

@Component({
  selector: 'app-blolys',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isWide: Boolean = true;
  currentPage: String = this.router.url;
  dropContentOpened: Boolean = false;
  delanguage: String = '中文简体';
  denet: String = '主网';

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
  ) {}
  public ngOnInit() {
    this.renderMenu();
    this.router.events.subscribe((res: RouterEvent) => {
      if (res instanceof NavigationEnd) {
        this.currentPage = res.url;
      }
    });
    if (window.location.href.indexOf('en') >= 0) {
      this.delanguage = 'English';
      this.denet = 'MainNet';
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
}
