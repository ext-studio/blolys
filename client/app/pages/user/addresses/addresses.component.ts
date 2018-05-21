import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../core';

@Component({
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  addresses: any;
  pageSize: any = 16;
  pageLength: number;
  isProgress: Boolean = true;

  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  ngOnInit() {
    this.getIssues(1, this.pageSize);
  }
  getIssues(pageIndex, pageSize) {
    this.addresses = [];
    this.isProgress = true;
    this.http.post(`${this.global.apiDomain}/api/address`,
      { 'method': 'getaddresses', 'params': [pageIndex, pageSize] }).subscribe((res: any) => {
      this.addresses = res.result.data;
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
