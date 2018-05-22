import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../core';

@Component({
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {
  blocks: any = [];
  pageIndex: any = 0;
  pageSize: any = 16;
  pageLength: number;
  isProgress: Boolean = true;

  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  ngOnInit() { }
  getIssues(pageIndex, pageSize) {
    this.blocks = [];
    this.isProgress = true;
    this.http.post(`${this.global.apiDomain}/api/block`,
      { 'method': 'getblocks', 'params': [pageIndex, pageSize] }).subscribe((res: any) => {
      this.blocks = res.result.data;
      this.pageLength = Math.ceil(res.result.total / this.pageSize);
      this.isProgress = false;
    }, (err) => {
      console.log(err);
    });
  }
  onpageGo(num: number) {
    this.getIssues(num, this.pageSize);
  }
}
