import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../core';

@Component({
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  dataSource: any;
  show: any = [];
  transType: String = 'all';
  pageIndex: Number = 0;  // 1 => go to page 1, 0 => no
  pageSize: any = 16;
  pageLength: number;

  constructor(
    private http: HttpClient,
    private global: GlobalService,
  ) { }

  ngOnInit() {
    this.getIssues(1, this.pageSize, this.transType);
    for (let i = 0; i < this.pageSize; i++) {
      this.show[i] = false;
    }
  }
  getIssues (pageIndex, pageSize, type) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'gettransactions', 'params': [pageIndex, pageSize, type] }).subscribe((res: any) => {
      this.dataSource = res.result.data;
      this.pageLength = Math.ceil(res.result.total / this.pageSize);
    }, (err) => {
      console.log(err);
    });
  }
  showInfo (index) {
    this.show[index] = !this.show[index];
  }
  changeTransType (type) {
    this.transType = type;
    this.pageIndex = 1;
    this.onpageGo(1);
  }
  onpageGo(num: number) {
    this.getIssues(num, this.pageSize, this.transType);
  }
}
