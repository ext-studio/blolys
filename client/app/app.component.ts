import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { GlobalService } from './core';
import { FormControl, Validators } from '@angular/forms';

import { BlockService } from './pages/block/block.service';
import { AddressService } from './pages/address/address.service';
import { NotsearchService } from './pages/notsearch/notsearch.service';
import { AssetService } from './pages/asset/asset.service';

@Component({
  selector: 'app-blolys',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isWide: Boolean = true;
  isSearch: Boolean = false;
  total: any = [];
  currentPage: String = this.router.url;
  dropContentOpened: Boolean = false;
  tolanguage: String = 'English';
  tonet: String = '测试网';
  dewallet: String = '关于钱包';
  apiDo: String;
  netDo: String;
  searchText = new FormControl('', [Validators.required]);

  routerSub: Subscription = null;
  conditionSub: Subscription = null;
  nep5InfoSub: Subscription = null;
  addrAssetsSub: Subscription = null;
  allcountsSub: Subscription = null;

  constructor(
    private router: Router,
    private global: GlobalService,
    private blockService: BlockService,
    private addressService: AddressService,
    private notsearchService: NotsearchService,
    private assetService: AssetService,
  ) {}
  public ngOnInit() {
    this.checkLangNet();
    this.allcountsSub = this.blockService.Allcounts(this.apiDo).subscribe((res: any) => {
      if (res.result) {
        this.total = res.result;
      }
    });
    this.renderMenu();
    this.routerSub = this.router.events.subscribe((res: RouterEvent) => {
      if (res instanceof NavigationEnd) {
        this.currentPage = res.url;
        this.checkLangNet();
      }
    });
  }
  checkLangNet() {
    if (window.location.href.indexOf('/en/#/') >= 0) {
      this.tolanguage = '中文简体';
      this.dewallet = 'Wallet';
      if (this.router.url.indexOf('/testnet') < 0) {
        this.tonet = 'Testnet';
        this.apiDo = this.global.apiDomain;
        this.netDo = this.global.netDomain;
      } else {
        this.tonet = 'Mainnet';
        this.apiDo = this.global.apiDotest;
        this.netDo = this.global.netDotest;
      }
    } else {
      this.tolanguage = 'English';
      this.dewallet = '关于钱包';
      if (this.router.url.indexOf('/testnet') < 0) {
        this.tonet = '测试网';
        this.apiDo = this.global.apiDomain;
        this.netDo = this.global.netDomain;
      } else {
        this.tonet = '主网';
        this.apiDo = this.global.apiDotest;
        this.netDo = this.global.netDotest;
      }
    }
  }
  ngOnDestroy() {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
    if (this.conditionSub) {
      this.conditionSub.unsubscribe();
    }
    if (this.nep5InfoSub) {
      this.nep5InfoSub.unsubscribe();
    }
    if (this.addrAssetsSub) {
      this.addrAssetsSub.unsubscribe();
    }
    if (this.allcountsSub) {
      this.allcountsSub.unsubscribe();
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
  changelang () {
    let href;
    href = window.location.href;
    if (href.indexOf('/en/') < 0) {
      if (href.indexOf('/cn/') >= 0) {
        href = href.replace('/cn/', '/en/');
      } else {
        href = href.replace('/#/', '/en/#/');
      }
    } else if (href.indexOf('/en/') >= 0) {
      href = href.replace('/en/', '/cn/');
    }
    window.location.href = href;
  }
  changenet() {
    let url: any;
    url = this.router.url;
    if (url.indexOf('/testnet') >= 0) {
      url = url.replace('/testnet', '/mainnet');
    } else if (url.indexOf('/testnet') < 0) {
      if (url.indexOf('/mainnet') >= 0) {
        url = url.replace('/mainnet', '/testnet');
      } else {
        url = '/testnet'.concat(url);
      }
    }
    this.router.navigate([url]);
  }
  navSearch() {
    if (!this.searchText.valid) {
      return ;
    }
    this.search(this.searchText.value);
  }
  navApplyFilter($event) {
    if ($event.keyCode === 13) {
      this.search($event.target.value);
    }
  }
  search(value) {
    let isHashPattern: any, isAssetPattern: any, isAddressPattern: any;
    value = value.trim(); // Remove whitespace
    isHashPattern = /^(0x)([0-9a-f]{64})$/;
    isAssetPattern = /^([0-9a-f]{40})$/;
    isAddressPattern = /^A([0-9a-zA-Z]{33})$/;
    if (isHashPattern.test(value)) {
      this.conditionSub = this.notsearchService.Condition(this.apiDo, value).subscribe((res: any) => {
        if (res.code === 200) {
          if (res.result === '1') {
            this.router.navigate([`${this.netDo}/transaction/${value}`]);
          } else if (res.result === '0') {
            this.router.navigate([`${this.netDo}/asset/${value}`]);
          }
        } else {
          this.router.navigate([`${this.netDo}/search/${value}`]);
        }
      });
    } else if (isAssetPattern.test(value)) {
      this.nep5InfoSub = this.assetService.Nep5Info(this.apiDo, value).subscribe((res: any) => {
        if (res.code === 200) {
          if (typeof res.result === 'string') {
            this.router.navigate([`${this.netDo}/transaction/${res.result}`]);
          } else if (typeof res.result === 'object') {
            this.router.navigate([`${this.netDo}/nep5/${value}`]);
          }
        } else {
          this.router.navigate([`${this.netDo}/search/${value}`]);
        }
      });
    } else if (isAddressPattern.test(value)) {
      this.addrAssetsSub = this.addressService.AddrAssets(this.apiDo, value).subscribe((res: any) => {
        if (res.code === 200) {
          this.router.navigate([`${this.netDo}/address/${value}`]);
        } else {
          this.router.navigate([`${this.netDo}/search/${value}`]);
        }
      });
    } else if (Number(value[0]) >= 0) {
      value = value.replace(/[,，]/g, '');
      let isNumberPattern: any;
      isNumberPattern = /^\d+$/;
      if (!isNaN(value) && isNumberPattern.test(value)) {
        value = Number(value);
        if (Number.isInteger(value) && value <= this.total.blockCounts) {
          this.router.navigate([`${this.netDo}/block/${value}`]);
          return;
        }
      }
      this.router.navigate([`${this.netDo}/search/${value}`]);
    } else {
      this.router.navigate([`${this.netDo}/search/${value}`]);
    }
  }
}
