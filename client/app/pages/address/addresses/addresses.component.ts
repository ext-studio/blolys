import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { GlobalService } from '../../../core';
import { AddressService } from '../address.service';

@Component({
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  addresses: any = [];
  pageIndex: any = 0;
  pageSize: any = 16;
  pageLength: number;
  isProgress: Boolean = true;

  constructor(
    // private http: HttpClient,
    // private global: GlobalService,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.getAddresses();
    // console.log(temp);
  }
  getAddresses(): void {
    this.addressService.getAddresses().subscribe((res) => {
      console.log(res);
    });
  }
  getIssues(pageIndex, pageSize) {
    this.addresses = [];
    this.isProgress = true;
    // this.addresses = res.result.data;
    // this.pageLength = Math.ceil(res.result.total / this.pageSize);
    // this.isProgress = false;
  }
  onpageGo(num: number) {
    this.getIssues(num, this.pageSize);
  }
}
