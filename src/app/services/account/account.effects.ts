import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap } from 'rxjs';

import * as AccountActions from './account.actions';
import { AccountApiService } from './account-api.service';


@Injectable()
export class AccountEffects {

    constructor (
        private actions$: Actions,
        private accountApiService: AccountApiService
    ) {}

    accountLogin$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AccountActions.loginStart),
            switchMap((accountData) => 
                this.accountApiService.login(
                        accountData.username,
                        accountData.password
                )
                .pipe (
                    switchMap(resultData => of(AccountActions.authenticateSucces({username: accountData.username, token: resultData.token}))),
                    catchError(errorResult => of(AccountActions.authenticateFail({ authError: errorResult.error })))
                )
            )
        )
    );
}

