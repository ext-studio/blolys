import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GlobalService } from '../../../core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  displayedColumns = ['index', 'txNum', 'time', 'size', 'nextConsensus'];
  dataSource: MatTableDataSource<any>;
  lastPage: Number;
  clickPage: any = 1;
  pageShowList: any;
  @Input() pageSize: number;
  @Input() pageLength: number;

  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  ngOnInit() {
    this.getIssues(1, this.pageSize);
    this.pageShowList = [1, 2, 3];
  }
  getIssues(pageIndex, pageSize) {
    this.http.post(`${this.global.apiDomain}/api/block`,
      { 'method': 'getblocks', 'params': [pageIndex, pageSize] }).subscribe((res: any) => {
      this.dataSource = new MatTableDataSource(res.result.data);
      this.pageLength = res.result.total;
      this.lastPage = Math.ceil(this.pageLength / this.pageSize);
    }, (err) => {
      console.log(err);
    });
  }
  pageGo(num) {
    if (num === this.lastPage) {
      this.getIssues(num, this.pageLength - (num - 1) * this.pageSize);
    } else {
      this.getIssues(num, this.pageSize);
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
      this.getIssues(this.clickPage, this.pageSize);
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
      this.getIssues(this.clickPage, this.pageSize);
    }
  }

}
