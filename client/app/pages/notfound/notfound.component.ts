import { Component, OnInit } from '@angular/core';

import { GlobalService } from '../../core';

@Component({
    templateUrl: 'notfound.component.html',
    styleUrls: ['notfound.component.scss']
})
export class NotFoundComponent implements OnInit {
    constructor(
        private global: GlobalService
    ) { }

    ngOnInit() {
        this.global.pushNotFound();
    }
}
