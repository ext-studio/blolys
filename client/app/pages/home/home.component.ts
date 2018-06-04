import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AlertComponent } from '../../shared';

import { BlockService } from '../block/block.service';
import { AddressService } from '../address/address.service';
import { TransactionService } from '../transaction/transaction.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  public total: any = [];
  searchForm: FormGroup;
  public queryCountTime: any;
  ngOnInit() {
    this.searchForm = this.builder.group({
      searchName: ['', [Validators.required]]
    });
    this.blockService.Allcounts().subscribe((res: any) => {
      if (res.result) {
        this.total = res.result;
      }
    });
    this.queryCountTime = setInterval(() => {
      this.blockService.Allcounts().subscribe((countres: any) => {
        if (countres.result) {
          this.total = countres.result;
        }
      });
    }, 20000);
  }
  ngOnDestroy() {
    window.clearInterval(this.queryCountTime);
  }

  constructor(
    private builder: FormBuilder,
    private router: Router,
    private blockService: BlockService,
    private addressService: AddressService,
    private transactionService: TransactionService
  ) { }

  applyFilter($event) {
    if ($event.keyCode === 13) {
      let value = $event.target.value;
      value = value.trim(); // Remove whitespace
      if (value[0] === 'A' && value.length === 34) {
        this.addressService.AddrAssets(value).subscribe((res: any) => {
          if (res.code !== 1004) {
            this.router.navigate([`/address/${value}`]);
          } else {
            this.router.navigate([`/search/${value}`]);
          }
        });
      } else if (value[0] === '0' && value[1] === 'x' && value.length === 66) {
        value = value.toLowerCase(); // Datasource defaults to lowercase matches
        this.transactionService.TxbyTxid(value).subscribe((res: any) => {
          if (res.result) {
            this.router.navigate([`/transaction/${value}`]);
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
          this.blockService.BlockByHeight(target).subscribe((res: any) => {
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
