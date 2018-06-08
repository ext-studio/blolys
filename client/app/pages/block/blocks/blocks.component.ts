import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BlockService } from '../block.service';
import { Subscription } from 'rxjs/Subscription';
import { GlobalService } from '../../../core';

@Component({
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit, OnDestroy {
  blocks: any = [];
  pageIndex: any = 0;
  pageSize: any = 16;
  pageLength: number;
  isProgress: Boolean = true;
  apiDo: String;
  netDo: String;

  blockSub: Subscription = null;

  constructor(
    private blockService: BlockService,
    private global: GlobalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.checkLangNet();
  }
  ngOnDestroy() {
    if (this.blockSub) {
      this.blockSub.unsubscribe();
    }
  }
  checkLangNet() {
    if (this.router.url.indexOf('/testnet') < 0) {
      this.apiDo = this.global.apiDomain;
      this.netDo = this.global.netDomain;
    } else {
      this.apiDo = this.global.apiDotest;
      this.netDo = this.global.netDotest;
    }
  }
  getIssues(pageIndex, pageSize) {
    this.blocks = [];
    this.isProgress = true;
    this.blockSub = this.blockService.Block(this.apiDo, pageIndex, pageSize).subscribe((res: any) => {
      if (res.code === 200) {
        if (res.result.total > 0) {
          this.blocks = res.result.data;
          this.pageLength = Math.ceil(res.result.total / this.pageSize);
          this.isProgress = false;
        }
      }
    });
  }
  onpageGo(num: number) {
    this.getIssues(num, this.pageSize);
  }
}
