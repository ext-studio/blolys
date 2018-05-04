import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../core';

@Component({
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  dataSource: any;
  totalCount: number;
  show: any = [];

  constructor(
    private http: HttpClient,
    private global: GlobalService,
  ) { }

  ngOnInit() {
    this.getIssues(1, 2);
    this.show = [false, false];
  }
  getIssues(pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/block`,
      { 'method': 'gettransactions', 'params': [pageIndex, pageSize, 'all'] }).subscribe((res: any) => {
      this.dataSource = res.result.data;
      this.totalCount = res.result.total;
    }, (err) => {
      console.log(err);
    });
  }
  showInfo(index) {
    this.show[index] = !this.show[index];
  }
}
