import { Component, OnInit } from '@angular/core';
import { BlockService } from '../block.service';

@Component({
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit {
  blocks: any = [];
  pageIndex: any = 0;
  pageSize: any = 16;
  pageLength: number;
  isProgress: Boolean = true;
  constructor(
    private blockService: BlockService,
  ) { }

  ngOnInit() {}
  getIssues(pageIndex, pageSize) {
    this.blocks = [];
    this.isProgress = true;
    this.blockService.Block(pageIndex, pageSize).subscribe((res: any) => {
      if (res.result) {
        this.blocks = res.result.data;
        this.pageLength = Math.ceil(res.result.total / this.pageSize);
        this.isProgress = false;
      }
    });
  }
  onpageGo(num: number) {
    this.getIssues(num, this.pageSize);
  }
}
