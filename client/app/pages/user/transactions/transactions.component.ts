import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../core';

@Component({
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  dataSource: any;
  totalCount: number; // the total count of transactions
  show: any = [];
  pageSize: any = 16;
  pageLength: number;

  constructor(
    private http: HttpClient,
    private global: GlobalService,
  ) { }

  ngOnInit() {
    this.getIssues(1, this.pageSize);
    for (let i = 0; i < this.pageSize; i++) {
      this.show[i] = false;
    }
  }
  getIssues(pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'gettransactions', 'params': [pageIndex, pageSize, 'ContractTransaction'] }).subscribe((res: any) => {
      this.dataSource = res.result.data;
      this.pageLength = Math.ceil(res.result.total / this.pageSize);
    }, (err) => {
      console.log(err);
    });
  }
  showInfo(index) {
    this.show[index] = !this.show[index];
  }
  onpageGo(num: number) {
    this.getIssues(num, this.pageSize);
  }
}
