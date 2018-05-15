import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { GlobalService } from '../../../core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns = ['name', 'type', 'amount', 'transactions', 'time'];
  dataSource: MatTableDataSource<any>;
  pageEvent: PageEvent;
  total = {
    count: Number,
    blocks: Number,
    assets: Number,
    transactions: Number,
    addresses: Number
  }
  searchForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
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
    })
    this.http.post(`${this.global.apiDomain}/api/index`,
      { 'method': 'queryallcounts' }).subscribe((res: any) => {
      this.total.assets = res.result.assetCounts;
      this.total.blocks = res.result.blockCounts ;
      this.total.addresses = res.result.addressCounts;
      this.total.transactions = res.result.txCounts;
    }, (err) => {
      console.log(err);
    });
    this.getAssets(1, 10);
  }

  getAssets(pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'gettransactions', 'params': [pageIndex, pageSize, "unit"] }).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.result.data);
    }, (err) => {
      console.log(err);
    });
  }
  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private builder: FormBuilder
  ) { }
}
