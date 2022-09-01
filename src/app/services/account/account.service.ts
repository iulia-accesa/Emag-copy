import { Injectable } from '@angular/core';

import { switchMap, of } from 'rxjs';
import { throwError } from 'rxjs';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer';
import * as AccountActions from '../../services/account/account.actions';

@Injectable()
export class AccountService {

  constructor(
    private store: Store<fromRoot.State>,
    private actionsSubject$: ActionsSubject
  ) { }

  login(
    username: string, 
    password: string
  ) {
    this.store.dispatch(AccountActions.loginStart({ username, password }));
    return this.actionsSubject$.pipe(
      ofType(AccountActions.authenticateSucces, AccountActions.authenticateFail),
      switchMap(action => {
        if (action.type === AccountActions.AccountActionType.AUTHENTICATE_FAIL) {
          return throwError(() => action.authError);
        }
        return of(action.token);
      })
    )
  }
}
