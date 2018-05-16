import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GlobalService } from '../../../core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './asset-info.component.html',
  styleUrls: ['./asset-info.component.scss']
})
export class AssetInfoComponent implements OnInit {
  dataSource: any;
  assetId: String = this.router.url.split('/')[3];

  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.http.post(`${this.global.apiDomain}/api/asset`,
      {'method': 'getassetinfo', 'params': [this.assetId]}).subscribe((res: any) => {
        this.dataSource = res.result;
        console.log(res.result);
    }, (err) => {
      console.log(err);
    });
  }
}
