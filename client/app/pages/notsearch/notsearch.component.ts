import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from '../../shared';

import { BlockService } from '../block/block.service';
import { AddressService } from '../address/address.service';
import { TransactionService } from '../transaction/transaction.service';
import { NotsearchService } from './notsearch.service';
import { AssetService } from '../asset/asset.service';
@Component({
  selector: 'app-notsearch',
  templateUrl: './notsearch.component.html',
  styleUrls: ['./notsearch.component.scss']
})
export class NotsearchComponent implements OnInit {
  searchForm: FormGroup;
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private blockService: BlockService,
    private addressService: AddressService,
    private transactionService: TransactionService,
    private notsearchService: NotsearchService,
    private assetService: AssetService
  ) { }

  ngOnInit() {
    this.searchForm = this.builder.group({
      searchName: ['', [Validators.required]]
    });
  }
  applyFilter($event) {
    if ($event.keyCode === 13) {
      let value = $event.target.value;
      value = value.trim(); // Remove whitespace
      if (value.length === 66) {
        this.notsearchService.Condition(value).subscribe((res: any) => {
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
        this.assetService.Nep5Info(value).subscribe((res: any) => {
          if (typeof res.result === 'string') {
            this.router.navigate([`/transaction/${res.result}`]);
          } else if (typeof res.result === 'object') {
            this.router.navigate([`/nep5/${value}`]);
          } else {
            this.router.navigate([`/search/${value}`]);
          }
        });
      } else if (value[0] === 'A' && value.length === 34) {
        this.addressService.AddrAssets(value).subscribe((res: any) => {
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
