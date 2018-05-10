import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GlobalService } from '../../../core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './asset-address.component.html',
  styleUrls: ['./asset-address.component.scss']
})
export class AssetAddressComponent implements OnInit {
  dataSource: any;
  address: String = this.router.url.split('/')[2];

  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.http.post(`${this.global.apiDomain}/api/block`,
      {'method': 'getaddressasset', 'params': [this.address]}).subscribe((res: any) => {
        // this.dataSource = res.result;
        console.log(res.result);
    }, (err) => {
      console.log(err);
    });
  }
}
