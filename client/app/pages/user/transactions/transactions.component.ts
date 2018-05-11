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
  pageNumber: any = 16;  // the transactions count of one page
  pageShowList: any;
  lastPage: Number;
  clickPage: any = 1;

  constructor(
    private http: HttpClient,
    private global: GlobalService,
  ) { }

  ngOnInit() {
    this.getIssues(1, this.pageNumber);
    for (let i = 0; i < this.pageNumber; i++) {
      this.show[i] = false;
    }
    this.pageShowList = [1, 2, 3];
  }
  getIssues(pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/transactions`,
      { 'method': 'gettransactions', 'params': [pageIndex, pageSize, 'ContractTransaction'] }).subscribe((res: any) => {
      this.dataSource = res.result.data;
      this.totalCount = res.result.total;
      this.lastPage = Math.ceil(this.totalCount / this.pageNumber);
    }, (err) => {
      console.log(err);
    });
  }
  showInfo(index) {
    this.show[index] = !this.show[index];
  }
  pageGo(num) {
    if (num === this.lastPage) {
      this.getIssues(num, this.totalCount - (num - 1) * this.pageNumber);
    } else {
      this.getIssues(num, this.pageNumber);
    }
    this.clickPage = num;
  }
  pagePreList() {
    if (this.pageShowList[0] - this.pageShowList.length > 0) {
      for (let i = 0; i < this.pageShowList.length; i++) {
        this.pageShowList[i] -= this.pageShowList.length;
      }
    } else if (this.pageShowList[0] === 2) {
      for (let i = 0; i < this.pageShowList.length; i++) {
        this.pageShowList[i]--;
      }
    } else if (this.pageShowList[0] === 3) {
      for (let i = 0; i < this.pageShowList.length; i++) {
        this.pageShowList[i] -= 2;
      }
    }
  }
  pageNextList() {
    if (this.pageShowList[this.pageShowList.length - 1] + this.pageShowList.length <= this.lastPage) {
      for (let i = 0; i < this.pageShowList.length; i++) {
        this.pageShowList[i] += this.pageShowList.length;
      }
    } else if (this.pageShowList[this.pageShowList.length - 1] + 1 === this.lastPage) {
      for (let i = 0; i < this.pageShowList.length; i++) {
        this.pageShowList[i] += 1;
      }
    } else if (this.pageShowList[this.pageShowList.length - 1] + 2 === this.lastPage) {
      for (let i = 0; i < this.pageShowList.length; i++) {
        this.pageShowList[i] += 2;
      }
    }
  }
  pagePre() {
    if (this.clickPage > 1) {
      this.clickPage -= 1;
      if (this.pageShowList[0] > this.clickPage) {
        for (let i = 0; i < this.pageShowList.length; i++) {
          this.pageShowList[i]--;
        }
      }
      this.getIssues(this.clickPage, this.pageNumber);
    }
  }
  pageNext() {
    if (this.clickPage < this.lastPage) {
      this.clickPage += 1;
      if (this.pageShowList[this.pageShowList.length - 1] < this.clickPage) {
        for (let i = 0; i < this.pageShowList.length; i++) {
          this.pageShowList[i]++;
        }
      }
      this.getIssues(this.clickPage, this.pageNumber);
    }
  }
}
