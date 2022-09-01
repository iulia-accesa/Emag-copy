import { Injectable } from '@angular/core';

import { switchMap, of, Observable, } from 'rxjs';
import { throwError } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, select, Store } from '@ngrx/store';

import * as AccountReducer from './account.reducer';
import * as AccountActions from './account.actions';
import * as AccountSelectors from './account.selectors';

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
}
