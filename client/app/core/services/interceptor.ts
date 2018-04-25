import { Injectable } from '@angular/core';
import {
  HttpResponse, HttpInterceptor as NgHttpInterceptor,
  HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { StorageService } from './storage';

@Injectable()
export class HttpInterceptor implements NgHttpInterceptor {
  constructor(
    private storage: StorageService,
    private router: Router
  ) {
    //
  }
  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // The verification code request will get the file stream so it is handled separately
    // if (req.url.indexOf('verifycode') > 0) {
    //     return this.verifyCodeHandle(req.clone({
    //         headers: req.headers
    //         .set("Authorization", 'Basic ZXh0OmV4dHVzZW9ubHk=')
    //     }), next);
    // }
    // Automatically bring your login credentials when you are logged in
    // let auth = this.storage.getAuth();
    // const nReq = req.clone({
    //     headers: req.headers
    //     .set("Authorization", 'Basic ZXh0OmV4dHVzZW9ubHk=')
    //     .set('AuthorizationID', auth['ID'] && auth['ID'].toString() || '')
    //     .set('AuthorizationToken', auth['Token'] || '')
    // });
    // Ordinary request automatically processed successfully or not
    // return this.commonHandle(nReq, next);
    return next.handle(req);
  }
  private commonHandle(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).map((event) => {
      if (event instanceof HttpResponse) {
        switch (event.status) {
          case 200:
          if (event.body['State']) {
            const newEvent = event.clone({body: event.body['Data']});
            return newEvent;
          } else {
            if (event.body['Message'] === 'unauthorized') {
              let role = this.storage.get('role') || 'user';
              this.storage.clearAuth(role);
              this.router.navigate([`/auth/${role}`]);
            }
            throw event.body['Message'];
          }
          default:
          throw new Error(`${event.status} - ${event.statusText}`);
        }
      }
      return event;
    });
  }
  private verifyCodeHandle(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).map((event) => {
      if (event instanceof HttpResponse) {
        switch (event.status) {
          case 200:
          if (event.body.byteLength < 10) {
            throw String.fromCharCode.apply(null, new Int8Array(event.body));
          }
        }
      }
      return event;
    });
  }
}
