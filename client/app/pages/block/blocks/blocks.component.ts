import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlockService } from '../block.service';
import { Subscription } from 'rxjs/Subscription';

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

  blockSub: Subscription = null;

  constructor(
    private blockService: BlockService,
  ) { }

  ngOnInit() {}
  ngOnDestroy() {
    if (this.blockSub) {
      this.blockSub.unsubscribe();
    }
  }
  getIssues(pageIndex, pageSize) {
    this.blocks = [];
    this.isProgress = true;
    this.blockSub = this.blockService.Block(pageIndex, pageSize).subscribe((res: any) => {
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
