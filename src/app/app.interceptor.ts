import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';

import { AccountService } from './services/account/account.service';
import { environment } from 'src/environments/environment';


@Injectable()
export class AppInterceptor implements HttpInterceptor {
  excludedUrls: Array<string>;

  constructor(
    private _accountService: AccountService
  ) {
    this.excludedUrls = [`${environment.apiUrl}/auth/login`]
  } 

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this._accountService.getToken$().pipe(
      take(1),
      exhaustMap(token => {
        if (!token || this.excludedUrls.includes(request.url)) {
          return next.handle(request);
        }
        const headers = request.headers.set('Authorization', `Bearer ${token}`);
        const modifiedRequest = request.clone({ headers });
        return next.handle(modifiedRequest);
      })
    );
  }
}
