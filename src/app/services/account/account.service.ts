import { Injectable } from '@angular/core';

import { switchMap, of, Observable, take, map, exhaustMap, tap } from 'rxjs';
import { throwError } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, select, Store } from '@ngrx/store';

import * as AccountReducer from './account.reducer';
import * as AccountActions from './account.actions';
import * as AccountSelectors from './account.selectors';
import { IUser } from './user.interface';

@Injectable()
export class AccountService {

  constructor(
    private _store: Store<AccountReducer.State>,
    private _actionsSubject$: ActionsSubject
  ) {
  }

  login$(username: string, password: string): Observable<boolean> {
    this._store.dispatch(AccountActions.loginStart({ username, password }));

    return this._actionsSubject$.pipe(
      ofType(AccountActions.authenticateSucces, AccountActions.authenticateFail),
      switchMap(action => {
        if (action.type === AccountActions.authenticateFail.type) {
          return throwError(() => action.authError);
        }
        return of(true);
      })
    )
  }

  getToken$(): Observable<string | undefined> {
    return this._store.pipe(select(AccountSelectors.getToken));
  }

  getUsername$(): Observable<string | undefined> {
    return this._store.pipe(select(AccountSelectors.getUsername));
  }

  getIsLoggedIn$(): Observable<boolean> {
    return this._store.pipe(select(AccountSelectors.getIsLoggedIn));
  }

  loadUser$(): Observable<IUser | undefined> {
    this.getUsername$()
      .pipe(take(1))
      .subscribe(usernameStore => this._store.dispatch(AccountActions.loadAccountStart({ username: usernameStore })))

    return this._actionsSubject$.pipe(
      ofType(AccountActions.loadAccountSucces, AccountActions.loadAccountFail),
      switchMap(action => {
        if (action.type === AccountActions.loadAccountFail.type) 
          return throwError(() => action.accountError);
        
        return of(action.user)
      })
    )
  }

  logout() {
    this._store.dispatch(AccountActions.logout());
    window.location.reload();
  }
}
