import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, of, switchMap, tap } from 'rxjs';

import * as AccountActions from './account.actions';
import { AccountApiService } from './account-api.service';

export enum AccountErrors {
    NO_USER_LOGGED = 'Error getting user data'
};

@Injectable()
export class AccountEffects {

    constructor (
        private _actions$: Actions,
        private _accountApiService: AccountApiService
    ) {}

    accountLogin$ = createEffect(() => 
        this._actions$.pipe(
            ofType(AccountActions.loginStart),
            switchMap((accountData) => 
                this._accountApiService.login(
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

    accountLoad$ = createEffect(() =>
        this._actions$.pipe(
            ofType(AccountActions.loadAccountStart),
            switchMap(({ username }) => 
                this._accountApiService.getUserByUsername(username)
                .pipe(
                    switchMap(resultData => {
                        if (resultData)
                            return of(AccountActions.loadAccountSucces({ user: 
                                {
                                    name: `${resultData?.name.firstname} ${resultData?.name.lastname}`,
                                    initials: `${resultData?.name.firstname.charAt(0).toUpperCase()}${resultData?.name.lastname.charAt(0).toUpperCase()}`,
                                    username: resultData?.username,
                                    email: resultData?.email,
                                    address: `${resultData?.address.street} ${resultData?.address.number}, ${resultData?.address.city}`,
                                    phone: resultData?.phone
                                }}))
                        return of(AccountActions.loadAccountFail({ accountError: AccountErrors.NO_USER_LOGGED }))
                    }),
                    catchError(errorResult => of(AccountActions.loadAccountFail({ accountError: errorResult.error })))
                )
            )
        )
    );
}

