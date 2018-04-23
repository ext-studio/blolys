import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { MatDialog } from '@angular/material';
import { StorageService } from '../../core';
import { AlertComponent } from '../../shared';

@Component({
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public isWide: boolean = true;
  public currentPage: string = this.router.url;
  constructor(
    private http: HttpClient,
    private router: Router,
    private dialog: MatDialog,
    private storage: StorageService
  ) {
      //
  }
  public ngOnInit() {
    this.renderMenu();
    this.router.events.subscribe((res: RouterEvent) => {
      if (res instanceof NavigationEnd) {
        this.currentPage = res.url;
      }
    });
  }
  @HostListener('window:resize') public onResize() {
    this.renderMenu();
  }
  private renderMenu() {
    if (window.innerWidth < 600 && this.isWide) {
      this.isWide = false;
      return;
    }
    if (window.innerWidth > 600 && !this.isWide) {
      this.isWide = true;
      return;
    }
  }

}
