import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { GlobalService } from '../../../core';

@Component({
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  displayedColumns = ['type', 'txid', 'time'];
  dataSource: MatTableDataSource<any>;
  pageEvent: PageEvent;
  totalCount: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  ngOnInit() {
    this.getIssues(1, 1);
    this.paginator.page.subscribe((page: PageEvent) => {
      this.getIssues(page.pageIndex + 1, page.pageSize);
    });
  }
  getIssues(pageIndex, pageSize) {
    // console.log(pageIndex + '  ' + pageSize)
    this.http.post(`${this.global.apiDomain}/api/block`,
      { 'method': 'gettransactions', 'params': [pageIndex, pageSize, 'all'] }).subscribe((res: any) => {
      // console.log(res.result.data);
      this.dataSource = new MatTableDataSource(res.result.data);
      this.totalCount = res.result.total;
    }, (err) => {
      console.log(err);
    });
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}
