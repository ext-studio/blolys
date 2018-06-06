import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AlertComponent } from '../../shared';

import { BlockService } from '../block/block.service';
import { AddressService } from '../address/address.service';
import { TransactionService } from '../transaction/transaction.service';
import { NotsearchService } from '../notsearch/notsearch.service';
import { AssetService } from '../asset/asset.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  public total: any = [];
  searchForm: FormGroup;
  public queryCountTime: any;

  conditionSub: Subscription = null;
  nep5InfoSub: Subscription = null;
  addrAssetsSub: Subscription = null;
  blockByHeightSub: Subscription = null;
  allcountsSub: Subscription = null;

  ngOnInit() {
    this.searchForm = this.builder.group({
      searchName: ['', [Validators.required]]
    });
    this.allcountsSub = this.blockService.Allcounts().subscribe((res: any) => {
      if (res.result) {
        this.total = res.result;
      }
    });
    this.queryCountTime = setInterval(() => {
      this.allcountsSub = this.blockService.Allcounts().subscribe((res: any) => {
        if (res.result) {
          this.total = res.result;
        }
      });
    }, 20000);
  }
  ngOnDestroy() {
    window.clearInterval(this.queryCountTime);
    if (this.conditionSub) {
      this.conditionSub.unsubscribe();
    }
    if (this.nep5InfoSub) {
      this.nep5InfoSub.unsubscribe();
    }
    if (this.addrAssetsSub) {
      this.addrAssetsSub.unsubscribe();
    }
    if (this.blockByHeightSub) {
      this.blockByHeightSub.unsubscribe();
    }
    if (this.allcountsSub) {
      this.allcountsSub.unsubscribe();
    }
  }

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private blockService: BlockService,
    private addressService: AddressService,
    private transactionService: TransactionService,
    private notsearchService: NotsearchService,
    private assetService: AssetService
  ) { }

  applyFilter($event) {
    if ($event.keyCode === 13) {
      let value = $event.target.value;
      value = value.trim(); // Remove whitespace
      if (value.length === 66) {
        this.conditionSub = this.notsearchService.Condition(value).subscribe((res: any) => {
          if (res.code === 200) {
            if (res.result === '1') {
              this.router.navigate([`/transaction/${value}`]);
            } else if (res.result === '0') {
              this.router.navigate([`/asset/${value}`]);
            }
          } else {
            this.router.navigate([`/search/${value}`]);
          }
        });
      } else if (value.length === 40) {
        this.nep5InfoSub = this.assetService.Nep5Info(value).subscribe((res: any) => {
          if (res.code === 200) {
            if (typeof res.result === 'string') {
              this.router.navigate([`/transaction/${res.result}`]);
            } else if (typeof res.result === 'object') {
              this.router.navigate([`/nep5/${value}`]);
            }
          } else {
            this.router.navigate([`/search/${value}`]);
          }
        });
      } else if (value[0] === 'A' && value.length === 34) {
        this.addrAssetsSub = this.addressService.AddrAssets(value).subscribe((res: any) => {
          if (res.code === 200) {
            this.router.navigate([`/address/${value}`]);
          } else {
            this.router.navigate([`/search/${value}`]);
          }
        });
      } else if (Number(value[0]) >= 0) {
        let target: any = 0;
        for (let i = 0; i < value.length; i++) {
          if (Number(value[i]) >= 0 && Number(value[i]) <= 9) {
            target = target * 10 + Number(value[i]);
          } else if (value[i] !== ',' && value[i] !== '，') {
            this.router.navigate([`/search/${value}`]);
          }
        }
        if (target >= 0) {
          this.blockByHeightSub = this.blockService.BlockByHeight(target).subscribe((res: any) => {
            if (res.result) {
              this.router.navigate([`/block/${target}`]);
            } else {
              this.router.navigate([`/search/${value}`]);
            }
          });
        }
      } else {
        this.router.navigate([`/search/${value}`]);
      }
    }
  }
}
