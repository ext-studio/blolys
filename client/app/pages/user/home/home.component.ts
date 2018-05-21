import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  public data: any = [
    ['2000-06-05', 116],
    ['2000-06-06', 129],
    ['2000-06-07', 135],
    ['2000-06-08', 86],
    ['2000-06-09', 73],
    ['2000-06-10', 85],
    ['2000-06-11', 73],
    ['2000-06-12', 68],
    ['2000-06-13', 92],
    ['2000-06-14', 130],
    ['2000-06-15', 245]];
  dateList = this.data.map(function (item) {
    return item[0];
  });
  valueList = this.data.map(function (item) {
    return item[1];
  });
  option = {

    // Make gradient line here
    visualMap: {
      show: false,
      type: 'continuous',
      seriesIndex: 0,
      min: 0,
      max: 400
    },

    title: {
      left: 'center',
      text: 'Gradient along the y axis',
      textStyle: {
        color: '#fff'
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      data: this.dateList
    },
    yAxis: {
      splitLine: { show: false }
    },
    grid: {
      bottom: '60%'
    },
    series: {
      type: 'line',
      showSymbol: false,
      data: this.valueList
    }
  };
  ngOnInit() {
    this.searchForm = this.builder.group({
      searchName: ['', [Validators.required]]
    });
    this.http.post(`${this.global.apiDomain}/api/index`,
      { 'method': 'queryallcounts' }).subscribe((res: any) => {
      this.total.assets = res.result.assetCounts;
      this.total.blocks = res.result.blockCounts ;
      this.total.addresses = res.result.addressCounts;
      this.total.transactions = res.result.txCounts;
    }, (err) => {
      console.log(err);
    });
  }

  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private builder: FormBuilder,
    private router: Router
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
            this.router.navigate([`/search/${value}`]);
            return ;
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
        this.router.navigate([`/search/${value}`]);
      }
    }
  }
}
