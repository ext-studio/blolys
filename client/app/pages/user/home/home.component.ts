import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AlertComponent } from '../../../shared';

interface Totals {
  assets: number;
  blocks: number;
  transactions: number;
  addresses: number;
}
@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  public total: Totals = {
    assets: 0,
    blocks: 0,
    addresses: 0,
    transactions: 0
  };
  searchForm: FormGroup;
  ngOnInit() {
    this.searchForm = this.builder.group({
      searchName: ['', [Validators.required]]
    });
    setInterval(() => {
      this.http.post(`${this.global.apiDomain}/api/index`,
      { 'method': 'queryallcounts' }).subscribe((res: any) => {
      this.total.assets = res.result.assetCounts;
      this.total.blocks = res.result.blockCounts ;
      this.total.addresses = res.result.addressCounts;
      this.total.transactions = res.result.txCounts;
    }, (err) => {
      console.log(err);
    });
    }, 20000);
  }

  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private builder: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) { }

  applyFilter($event) {
    if ($event.keyCode === 13) {
      let value = $event.target.value;
      value = value.trim(); // Remove whitespace
      if (value[0] === 'A' && value.length === 34) {
        this.http.post(`${this.global.apiDomain}/api/asset`,
          {'method': 'getaddrassets', 'params': [value]}).subscribe((res: any) => {
          if (res.code === 200) {
            this.router.navigate([`/address/${value}`]);
          } else {
            this.router.navigate([`/search/${value}`]);
          }
        }, (err) => {
          console.log(err);
        });
      } else if (value[0] === '0' && value[1] === 'x' && value.length === 66) {
        value = value.toLowerCase(); // Datasource defaults to lowercase matches
        this.http.post(`${this.global.apiDomain}/api/transactions`,
          {'method': 'getscripts', 'params': [value]}).subscribe((res: any) => {
            if (res.code === 200) {
              this.router.navigate([`/transaction/${value}`]);
            } else {
              this.router.navigate([`/search/${value}`]);
            }
        }, (err) => {
          console.log(err);
        });
      } else if (Number(value[0]) >= 0) {
        let target: any = 0;
        for (let i = 0; i < value.length; i++) {
          if (Number(value[i]) >= 0 && Number(value[i]) <= 9) {
            target = target * 10 + Number(value[i]);
          } else if (value[i] !== ',' && value[i] !== '，') {
            this.dialog.open(AlertComponent,
              {data: {type: 'warn', title: 'Search error', body: '您的输入有误，请重新输入', ok: '确定', no: '取消'}});
          }
        }
        if (target >= 0) {
          this.http.post(`${this.global.apiDomain}/api/block`,
            { 'method': 'getblockbyheight', 'params': [target]} ).subscribe((res: any) => {
            if (res.code === 200) {
              this.router.navigate([`/block/${target}`]);
            } else {
              this.router.navigate([`/search/${value}`]);
            }
          }, (err) => {
            console.log(err);
          });
        }
      } else {
        this.dialog.open(AlertComponent,
          {data: {type: 'warn', title: 'Search error', body: '您的输入有误，请重新输入', ok: '确定', no: '取消'}});
      }
    }
  }
}
