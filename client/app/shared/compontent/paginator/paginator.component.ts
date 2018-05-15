import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {
  clickPage: any = 1;
  pageShowList: any;
  @Input() pageSize: number;
  @Input() pageLength: number;
  @Output() onPageGo = new EventEmitter<number>();

  constructor(
    private http: HttpClient,
    private global: GlobalService
  ) { }

  ngOnInit() {
    this.pageShowList = [1, 2, 3];
  }
  pageGo(num: number) {
    this.onPageGo.emit(num);
    this.clickPage = num;
  }
  pagePreList() {
    if (this.pageShowList[0] - this.pageShowList.length > 0) {
      for (let i = 0; i < this.pageShowList.length; i++) {
        this.pageShowList[i] -= this.pageShowList.length;
      }
    } else if (this.pageShowList[0] === 2) {
      for (let i = 0; i < this.pageShowList.length; i++) {
        this.pageShowList[i]--;
      }
    } else if (this.pageShowList[0] === 3) {
      for (let i = 0; i < this.pageShowList.length; i++) {
        this.pageShowList[i] -= 2;
      }
    }
  }
  pageNextList() {
    if (this.pageShowList[this.pageShowList.length - 1] + this.pageShowList.length <= this.pageLength) {
      for (let i = 0; i < this.pageShowList.length; i++) {
        this.pageShowList[i] += this.pageShowList.length;
      }
    } else if (this.pageShowList[this.pageShowList.length - 1] + 1 === this.pageLength) {
      for (let i = 0; i < this.pageShowList.length; i++) {
        this.pageShowList[i] += 1;
      }
    } else if (this.pageShowList[this.pageShowList.length - 1] + 2 === this.pageLength) {
      for (let i = 0; i < this.pageShowList.length; i++) {
        this.pageShowList[i] += 2;
      }
    }
  }
  pagePre() {
    if (this.clickPage > 1) {
      this.clickPage -= 1;
      if (this.pageShowList[0] > this.clickPage) {
        for (let i = 0; i < this.pageShowList.length; i++) {
          this.pageShowList[i]--;
        }
      }
      this.pageGo(this.clickPage);
    }
  }
  pageNext() {
    if (this.clickPage < this.pageLength) {
      this.clickPage += 1;
      if (this.pageShowList[this.pageShowList.length - 1] < this.clickPage) {
        for (let i = 0; i < this.pageShowList.length; i++) {
          this.pageShowList[i]++;
        }
      }
      this.pageGo(this.clickPage);
    }
  }

}
