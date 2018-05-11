import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { GlobalService } from '../../../core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './block-info.component.html',
  styleUrls: ['./block-info.component.scss']
})
export class BlockInfoComponent implements OnInit {
  blockTransaction: any;
  blockInfo: any;
  height: Number = Number(this.router.url.split('/')[2]);

  constructor(
    private http: HttpClient,
    private global: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.http.post(`${this.global.apiDomain}/api/block`,
      {'method': 'getblockbyheight', 'params': [this.height]}).subscribe((res: any) => {
        this.blockInfo = res.result;
        console.log(res.result);
    }, (err) => {
      console.log(err);
    });
    this.http.post(`${this.global.apiDomain}/api/block`,
      { 'method': 'gettransactions', 'params': [1, 5, 'ContractTransaction'] }).subscribe((res: any) => {
      this.blockTransaction = res.result.data;
    }, (err) => {
      console.log(err);
    });
  }

}
