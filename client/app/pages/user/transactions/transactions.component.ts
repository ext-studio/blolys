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
  pageSize: any = 16;
  pageLength: number;
  pageIndex: Boolean = false;
  isProgress: Boolean = true;

  constructor(
    private http: HttpClient,
    private global: GlobalService,
  ) { }

  ngOnInit() {
    this.pageIndex = true;
    this.getIssues(1, this.pageSize);
    for (let i = 0; i < this.pageSize; i++) {
      this.show[i] = false;
    }
  }
  getIssues (pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'gettransactions', 'params': [pageIndex, pageSize, this.transType] }).subscribe((res: any) => {
      this.dataSource = res.result.data;
      this.pageLength = Math.ceil(res.result.total / this.pageSize);
      this.isProgress = false;
    }, (err) => {
      console.log(err);
    });
  }
  showInfo (index) {
    this.show[index] = !this.show[index];
  }
  changeTransType (type: string) {
    this.transType = type;
    this.pageIndex = true;
    this.onpageGo(1);
  }
  onpageGo(num: number) {
    this.getIssues(num, this.pageSize);
  }

}
