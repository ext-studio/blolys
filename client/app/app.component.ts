import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { GlobalService } from './core';

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
  dewallet: String = '关于钱包';
  apiDo: String;
  netDo: String;

  routerSub: Subscription = null;

  constructor(
    private router: Router,
    private global: GlobalService
  ) {}
  public ngOnInit() {
    this.renderMenu();
    this.checkLangNet();
    this.routerSub = this.router.events.subscribe((res: RouterEvent) => {
      if (res instanceof NavigationEnd) {
        this.currentPage = res.url;
        this.checkLangNet();
      }
    });
  }
  checkLangNet() {
    if (window.location.href.indexOf('/en/#/') >= 0) {
      this.delanguage = 'English';
      this.dewallet = 'Wallet';
      if (this.router.url.indexOf('/testnet') < 0) {
        this.denet = 'Mainnet';
        this.apiDo = this.global.apiDomain;
        this.netDo = this.global.netDomain;
      } else {
        this.denet = 'TestNet';
        this.apiDo = this.global.apiDotest;
        this.netDo = this.global.netDotest;
      }
    } else {
      this.delanguage = '中文简体';
      this.dewallet = '关于钱包';
      if (this.router.url.indexOf('/testnet') < 0) {
        this.denet = '主网';
        this.apiDo = this.global.apiDomain;
        this.netDo = this.global.netDomain;
      } else {
        this.denet = '测试网';
        this.apiDo = this.global.apiDotest;
        this.netDo = this.global.netDotest;
      }
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
    if (window.innerWidth < 1030 && this.isWide) {
      this.isWide = false;
      return;
    }
    if (window.innerWidth > 1030 && !this.isWide) {
      this.isWide = true;
      return;
    }
  }
  changelang (lang) {
    let href;
    href = window.location.href;
    if (lang === 'en' && href.indexOf('/en/') < 0) {
      if (href.indexOf('/cn/') >= 0) {
        href = href.replace('/cn/', '/en/');
      } else {
        href = href.replace('/#/', '/en/#/');
      }
    } else if (lang === 'cn' && href.indexOf('/en/') >= 0) {
      href = href.replace('/en/', '/cn/');
    }
    window.location.href = href;
  }
  changenet(net) {
    let url: String;
    url = this.router.url;
    if (net === 'mainnet' && url.indexOf('/testnet') >= 0) {
      url = url.replace('/testnet', '/mainnet');
    } else if (net === 'testnet' && url.indexOf('/testnet') < 0) {
      url = url.replace('/mainnet', '/testnet');
    }
    this.router.navigate([url]);
  }
}
