import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { StorageService, GlobalService } from '../../../core';

@Component({
	templateUrl: './assets.component.html',
	styleUrls: ['./assets.component.scss']
})
export class AssetsComponent implements OnInit {

	displayedColumns = ['ID', 'name', 'type', 'amount', 'transactions', 'time'];
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
			this.getIssues(page.pageIndex+1, page.pageSize);
		});
	}
	getIssues(pageIndex, pageSize) {
		console.log(pageIndex + '  ' + pageSize)
		this.http.post(`${this.global.apiDomain}/api/block`, {"method": "getassets", "params": [pageIndex, pageSize]}).subscribe((res: any) => {
			console.log(res.result.result)
			this.dataSource = new MatTableDataSource(res.result.result);
			this.totalCount = 10;
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
