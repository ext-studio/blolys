import { Component, OnInit } from '@angular/core';
import { AddressService } from '../address.service';

@Component({
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  addresses: any = [];
  pageIndex: any = 0;
  pageSize: any = 16;
  pageLength: any = 0;
  isProgress: Boolean = true;

  constructor(
    private addressService: AddressService
  ) { }

  ngOnInit() {}
  getAddresses(pageIndex, pageSize) {
    this.addresses = [];
    this.isProgress = true;
    this.addressService.Addresses(pageIndex, pageSize).subscribe((res: any) => {
      if (res.code === 200) {
        if (res.result.total > 0) {
          this.addresses = res.result.data;
          this.pageLength = Math.ceil(res.result.total / this.pageSize);
          this.isProgress = false;
        }
      }
    });
  }
  onpageGo(num: number) {
    this.getAddresses(num, this.pageSize);
  }
}
