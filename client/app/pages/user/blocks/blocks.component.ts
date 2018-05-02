import { Component, OnInit , ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { GlobalService } from '../../../core';

@Component({
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {
  displayedColumns = ['index', 'size', 'time'];
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
      { 'method': 'getblocks', 'params': [pageIndex, pageSize] }).subscribe((res: any) => {
      // console.log(res.result.result)
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
