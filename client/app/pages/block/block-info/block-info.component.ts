import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationEnd, ActivatedRoute } from '@angular/router';

import { BlockService } from '../block.service';
import { TransactionService } from '../../transaction/transaction.service';
import { Subscription } from 'rxjs/Subscription';
import { GlobalService } from '../../../core';

@Component({
    templateUrl: './block-info.component.html',
    styleUrls: ['./block-info.component.scss']
})
export class BlockInfoComponent implements OnInit, OnDestroy {
    blockTransactions: any = [];
    transfer: any = [];
    transferNep5: any = [];
    blockInfo: any = [];
    transTotal: number = 0;
    totalBlocks: number = 0;
    show: any = [];
    height: number = Number(this.router.url.split('/')[3]);
    pageIndex = 1;
    pageSize: any = 5;
    pageLength: any = 0;
    isProgress: boolean = true;
    apiDo: string;
    netDo: string;
    isNumberPattern: any = /^\d+$/;

    routerSub: Subscription = null;
    allcountsSub: Subscription = null;
    txByHeightSub: Subscription = null;
    blockByHeightSub: Subscription = null;
    transferByTxidSub: Subscription = null;
    nep5TransferByTxidSub: Subscription = null;

    constructor(
        private router: Router,
        private blockService: BlockService,
        private transactionService: TransactionService,
        private global: GlobalService,
        private aRouter: ActivatedRoute
    ) {}

    ngOnDestroy() {
        if (this.routerSub) {
            this.routerSub.unsubscribe();
        }
        if (this.allcountsSub) {
            this.allcountsSub.unsubscribe();
        }
        if (this.txByHeightSub) {
            this.txByHeightSub.unsubscribe();
        }
        if (this.blockByHeightSub) {
            this.blockByHeightSub.unsubscribe();
        }
        if (this.transferByTxidSub) {
            this.transferByTxidSub.unsubscribe();
        }
        if (this.nep5TransferByTxidSub) {
            this.nep5TransferByTxidSub.unsubscribe();
        }
    }
    ngOnInit() {
        if (this.isNumberPattern.test(this.height)) {
            this.checkLangNet();
            this.initPage();
        } else {
            this.router.navigate(['/notfound']);
        }
        this.aRouter.params.subscribe(params => {
            if (this.isNumberPattern.test(params.id)) {
                const height = Number(params.id);
                if (height !== this.height) {
                    this.height = height;
                    this.initPage();
                }
                const page = Number(params.page);
                this.pageIndex = page;
                this.initShow();
                this.getTxByHeight(page, this.pageSize);
            } else {
                this.router.navigate(['/notfound']);
            }
        });
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
    initPage() {
        this.getBlockByHeight();
        this.allcountsSub = this.blockService.Allcounts(this.apiDo).subscribe((res: any) => {
            if (res.result) {
                this.totalBlocks = res.result.blockCounts;
            }
        });
    }
    initShow() {
        for (let i = 0; i < this.pageSize; i++) {
            this.show[i] = false;
            this.transfer[i] = 0;
            this.transferNep5[i] = 0;
        }
    }
    getTxByHeight(pageIndex, pageSize) {
        this.isProgress = true;
        this.txByHeightSub = this.blockService.TxByHeight(this.apiDo, pageIndex, pageSize, this.height).subscribe((res: any) => {
            if (res.result) {
                this.blockTransactions = res.result.data;
                this.transTotal = res.result.total;
                this.pageLength = Math.ceil(res.result.total / this.pageSize);
                this.isProgress = false;
            } else {
                this.blockTransactions = false;
            }
        });
    }
    getBlockByHeight() {
        this.blockInfo = [];
        this.blockByHeightSub = this.blockService.BlockByHeight(this.apiDo, this.height).subscribe((res: any) => {
            if (res.result) {
                this.blockInfo = res.result;
            }
        });
    }
    getTransferByTxid(index, txid) {
        this.transferByTxidSub = this.transactionService.TransferByTxid(this.apiDo, txid).subscribe((res: any) => {
            if (res.code === 200) {
                if (res.result.TxUTXO != null || res.result.TxVouts != null) {
                    this.transfer[index] = res.result;
                }
            }
        });
    }
    getNep5TransferByTxid(index, txid) {
        this.nep5TransferByTxidSub = this.transactionService.Nep5TransferByTxid(this.apiDo, txid).subscribe((res: any) => {
            if (res.code === 200) {
                if (res.result.length > 0) {
                    this.transferNep5[index] = res.result;
                }
            }
        });
    }
    showInfo(index, txid) {
        this.show[index] = !this.show[index];
        if (this.show[index] && this.transfer[index] === 0 && this.transferNep5[index] === 0) {
            this.transfer[index] = '';
            this.transferNep5[index] = '';
            this.getTransferByTxid(index, txid);
            this.getNep5TransferByTxid(index, txid);
        }
    }
    onpageGo(num: number) {
        const oldUrl = this.router.url;
        const preEndUrl = oldUrl.lastIndexOf(String(this.pageIndex));
        const newUrl = oldUrl.slice(0, preEndUrl) + num;
        this.router.navigateByUrl(newUrl);
    }
}
