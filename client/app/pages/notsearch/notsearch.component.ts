import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../shared';

import { BlockService } from '../block/block.service';
import { AddressService } from '../address/address.service';
import { TransactionService } from '../transaction/transaction.service';

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
    private dialog: MatDialog,
    private blockService: BlockService,
    private addressService: AddressService,
    private transactionService: TransactionService
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
      if (value[0] === 'A' && value.length === 34) {
        this.addressService.AddrAssets(value).subscribe((res: any) => {
          if (res.result) {
            this.router.navigate([`/address/${value}`]);
          } else {
            this.router.navigate([`/search/${value}`]);
          }
        });
      } else if (value[0] === '0' && value[1] === 'x' && value.length === 66) {
        value = value.toLowerCase(); // Datasource defaults to lowercase matches
        this.transactionService.Script(value).subscribe((res: any) => {
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
            if (window.location.href.indexOf('cn') >= 0) {
              this.dialog.open(AlertComponent,
                {data: {type: 'warn', title: '错误', body: '您的输入有误，请重新输入', ok: '确认', no: '取消'}});
            } else {
              this.dialog.open(AlertComponent,
                {data: {type: 'warn', title: 'Search error', body: 'Your input is wrong, please re-enter', ok: 'ok', no: 'cancel'}});
            }
            return;
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
        if (window.location.href.indexOf('cn') >= 0) {
          this.dialog.open(AlertComponent,
            {data: {type: 'warn', title: '错误', body: '您的输入有误，请重新输入', ok: '确认', no: '取消'}});
        } else {
          this.dialog.open(AlertComponent,
            {data: {type: 'warn', title: 'Search error', body: 'Your input is wrong, please re-enter', ok: 'ok', no: 'cancel'}});
        }
      }
    }
  }
}
