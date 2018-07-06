import { Component, Input, EventEmitter, Output, OnChanges, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from '../../../core';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})

export class PaginatorComponent implements OnChanges, OnInit {
    clickPage: any = 1;
    pageShowList: any = [];
    @Input() pageIndex: any;
    @Input() pageSize: number;
    @Input() pageLength: number;
    @Output() onpageGo = new EventEmitter<number>();

    constructor(
        private http: HttpClient,
        private global: GlobalService
    ) { }
    ngOnInit () {
        this.pageGo(1);
    }
    ngOnChanges() {
        if (this.pageIndex > 0) {
            this.pageGo(1);
            this.pageIndex = 0;
        }
        if (this.pageIndex === 0) {
            this.initShow();
        }
    }
    initShow () {
        if (this.pageLength >= 3) {
            this.pageShowList = [1, 2, 3];
        } else if (this.pageLength === 2) {
            this.pageShowList = [1, 2];
        } else {
            this.pageShowList = [1];
        }
    }
    pageGo(num: number) {
        this.onpageGo.emit(num);
        if (num !== 1) {
            this.pageIndex = -1;
        }
        this.clickPage = num;
    }
    pagePreList() {
        if (this.pageShowList[0] - this.pageShowList.length > 0) {
            for (let i = 0; i < this.pageShowList.length; i++) {
                this.pageShowList[i] -= this.pageShowList.length;
            }
        } else {
            for (let i = 0; i < this.pageShowList.length; i++) {
                this.pageShowList[i] = i + 1;
            }
        }
    }
    pageNextList() {
        if (this.pageShowList[this.pageShowList.length - 1] + this.pageShowList.length <= this.pageLength) {
            for (let i = 0; i < this.pageShowList.length; i++) {
                this.pageShowList[i] += this.pageShowList.length;
            }
        } else {
            for (let i = 0; i < this.pageShowList.length; i++) {
                this.pageShowList[i] = this.pageLength - this.pageShowList.length + i + 1;
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
