import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exhaustMap, take, map} from 'rxjs/operators';

import * as fromRoot from './app.reducer';


@Injectable()
export class AppInterceptor implements HttpInterceptor{

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const savedToken = localStorage.getItem('userToken');
    return this.store.select('account').pipe(
      take(1),
      map(accountState => {
        return accountState.token;
      }),
      exhaustMap(token => {
        if (!token && savedToken == null) {
          return next.handle(request);
        }
        const modifiedRequest = request.clone({
          params: new HttpParams().set('Authorization', `Bearer ${savedToken}`)
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
