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
      this.dewallet = 'About wallet';
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
        this.denet = '主    网';
        this.apiDo = this.global.apiDomain;
        this.netDo = this.global.netDomain;
      } else {
        this.denet = '测试网  ';
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
    if (window.innerWidth < 830 && this.isWide) {
      this.isWide = false;
      return;
    }
    if (window.innerWidth > 830 && !this.isWide) {
      this.isWide = true;
      return;
    }
  }
  changelang (lang) {
    let href, starthref, endhref, targethref;
    href = window.location.href;
    if (lang === 'en' && href.indexOf('/en/') < 0) {
      starthref = href.substr(0, href.indexOf('#'));
      endhref = href.substr(href.indexOf('#'), href.length);
      targethref = starthref.concat('en/');
      targethref = targethref.concat(endhref);
      window.location.href = targethref;
    } else if (lang === 'cn' && href.indexOf('/en/') >= 0) {
      starthref = href.substr(0, href.indexOf('/en/#/'));
      endhref = href.substr(href.indexOf('/#/'), href.length);
      targethref = starthref.concat(endhref);
      window.location.href = targethref;
    }
  }
  changenet(net) {
    let url: String, endhref: string, targethref: string;
    url = this.router.url;
    endhref = url.substr(8, url.length - 1);
    targethref = net.concat(endhref);
    if (net === 'mainnet' && url.indexOf('/testnet') >= 0) {
      this.router.navigate([targethref]);
    } else if (net === 'testnet' && url.indexOf('/testnet') < 0) {
      this.router.navigate([targethref]);
    }
  }
  pageTo() {
    window.location.reload();
  }
}
