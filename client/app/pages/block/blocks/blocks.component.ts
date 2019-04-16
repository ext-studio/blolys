import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BlockService } from '../block.service';
import { Subscription } from 'rxjs/Subscription';
import { GlobalService } from '../../../core';

@Component({
    templateUrl: './blocks.component.html',
    styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit, OnDestroy {
    blocks: any = [];
    pageIndex = 1;
    pageSize: any = 16;
    pageLength: number;
    isProgress: Boolean = true;
    apiDo: String;
    netDo: String;

    blockSub: Subscription = null;

    constructor(
        private blockService: BlockService,
        private global: GlobalService,
        private router: Router,
        private aRouter: ActivatedRoute
    ) { }

    ngOnInit() {
        this.checkLangNet();
        this.aRouter.params.subscribe(params => {
            const page = Number(params.page);
            this.pageIndex = page;
            this.getIssues(page, this.pageSize);
        });
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
        const oldUrl = this.router.url;
        const preEndUrl = oldUrl.lastIndexOf(String(this.pageIndex));
        const newUrl = oldUrl.slice(0, preEndUrl) + num;
        this.router.navigateByUrl(newUrl);
    }
}
