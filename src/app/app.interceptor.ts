import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { exhaustMap, take } from 'rxjs/operators';

import { AccountService } from './services/account/account.service';


@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(
    private accountService: AccountService
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.accountService.getToken$().pipe(
      take(1),
      exhaustMap(token => {
        if (!token) {
          return next.handle(request);
        }

        // Bearer token should be set in Request Header
        // const modifiedRequest = request.clone({
        //   params: new HttpParams().set('Authorization', `Bearer ${token}`)
        // });

        const headers = request.headers.set('Authorization', `Bearer ${token}`);
        const modifiedRequest = request.clone({ headers });
        return next.handle(modifiedRequest);
      })
    );
  }
}
