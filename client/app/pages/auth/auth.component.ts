import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatStepper, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { StorageService, GlobalService } from '../../core';
import { AlertComponent } from '../../shared';

@Component({
  templateUrl: 'auth.component.html',
  styleUrls: ['auth.component.scss']
})
export class AuthComponent implements OnInit {
  public authForm: FormGroup;
  public codeForm: FormGroup;
  public verifyImageBuffer: ArrayBuffer;
  public fetching: boolean = false;
  public authing: boolean = false;

  constructor(
    private builder: FormBuilder,
    private http: HttpClient,
    private storage: StorageService,
    private router: Router,
    private dialog: MatDialog,
    private global: GlobalService
  ) { }

  ngOnInit() {
    this.authForm = this.builder.group({
      email: ['', [Validators.required, Validators.pattern(/^[0-9a-zA-Z]+[@][0-9a-zA-Z]+\.[0-9a-zA-Z]+$/)]],
      pwd: ['', [Validators.required]]
    });
    this.codeForm = this.builder.group({
      code: ['', [Validators.required]]
    });
  }

  public fetchCode(stepper: MatStepper) {
    if (!this.authForm.valid || this.fetching) {
      return;
    }
    this.fetching = true;
    this.http.post(`${this.global.apiDomain}/auth/verifycode`, {email: this.authForm.controls.email.value}, {responseType: 'arraybuffer'}).subscribe((res: ArrayBuffer) => {
      this.verifyImageBuffer = res;
      this.fetching = false;
      if (stepper) {
        stepper.next();
      }
    }, (err) => {
      let result;
      if (err === 'not_exist') {
        result = 'Email not exist !';
      } else {
        result = 'Sign in failed : (';
      }
      console.log(err);
      this.dialog.open(AlertComponent, {data: {type: 'warn', title: 'Tip', body: result, ok: 'Close'}});
      this.fetching = false;
      stepper.reset();
    });
  }

  public auth(stepper: MatStepper) {
    if (!this.codeForm.valid || this.authing) {
      return;
    }
    this.authing = true;
    this.http.post(
      `${this.global.apiDomain}/auth/auth`,
      Object.assign(this.authForm.value, this.codeForm.value)
    ).subscribe((res: any) => {
      this.storage.setAuth('auth', res);
      this.authing = false;
      // redirect
      this.router.navigate(['/auth/home']);
    }, (err) => {
      this.authing = false
      let result;
      switch (err) {
        case 'code_error':
        result = 'Verify code error : (';
        break;
        case 'auth_error':
        result = 'Email or password error : (';
        break;
        default:
        result = 'Sign in failed : (';
        break;
      }
      stepper.reset();
      this.dialog.open(AlertComponent, {data: {type: 'warn', title: 'Tip', body: result, ok: 'Close'}});
    });
  }
}
