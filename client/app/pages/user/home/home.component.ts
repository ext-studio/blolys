import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { GlobalService } from '../../../core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  displayedColumns = ['name', 'type', 'amount', 'transactions', 'time'];
  dataSource: MatTableDataSource<any>;
  pageEvent: PageEvent;
  totalCount: number;
  totalBlocks: number;
  totalAssets: number;
  totalTransactions: number;
  totalAddresses: number;
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
    this.http.post(`${this.global.apiDomain}/api/index`,
      { 'method': 'queryallcounts' }).subscribe((res: any) => {
      this.totalAssets = res.result.assetCounts;
      this.totalBlocks = res.result.blockCounts ;
      this.totalAddresses = res.result.addressCounts;
      this.totalTransactions = res.result.txCounts;
    }, (err) => {
      console.log(err);
    });
    this.getAssets(1, 10);
  }

  getAssets(pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/block`,
      { 'method': 'getassets', 'params': [pageIndex, pageSize] }).subscribe((res: any) => {
      this.totalAssets = res.result.total;
      this.dataSource = new MatTableDataSource(res. result.data);
    }, (err) => {
      console.log(err);
    });
  }
  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }
}
