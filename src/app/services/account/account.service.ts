import { Injectable } from '@angular/core';

import { switchMap, of, Observable, take } from 'rxjs';
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
    private store: Store<AccountReducer.State>,
    private actionsSubject$: ActionsSubject
  ) {
  }

  login$(username: string, password: string): Observable<boolean> {
    this.store.dispatch(AccountActions.loginStart({ username, password }));

    return this.actionsSubject$.pipe(
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
    return this.store.pipe(select(AccountSelectors.getToken));
  }

  getUsername$(): Observable<string | undefined> {
    return this.store.pipe(select(AccountSelectors.getUsername));
  }

  getIsLoggedIn$(): Observable<boolean> {
    return this.store.pipe(select(AccountSelectors.getIsLoggedIn));
  }

  loadUser$(): Observable<IUser | undefined> {
    return this.getUsername$().pipe(
      take(1),
      switchMap(usernameStore => {
        this.store.dispatch(AccountActions.loadAccountStart({ username: usernameStore}))
        return this.actionsSubject$.pipe(
          ofType(AccountActions.loadAccountSucces, AccountActions.loadAccountFail),
          switchMap(action => {
            if (action.type === AccountActions.loadAccountFail.type) 
              return throwError(() => action.accountError);
            
            return of(action.user)
          })
        )
      })
    )
  }
}
