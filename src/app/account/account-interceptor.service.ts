import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { exhaustMap, take, tap, map} from 'rxjs/operators';
import * as fromRoot from '../app.reducer';

@Injectable()
export class AccountInterceptorService implements HttpInterceptor{

  constructor(
    private store: Store<fromRoot.State>
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('account').pipe(
      take(1),
      map(accountState => {
        return accountState.user;
      }),
      exhaustMap(user => {
        if (!user || !localStorage.getItem('userToken')) {
          return next.handle(request);
        }
        const modifiedRequest = request.clone({
          params: new HttpParams().set('Authorization', `Bearer ${user.token}`)
        });
        return next.handle(modifiedRequest);
      })
    );
  }
}
