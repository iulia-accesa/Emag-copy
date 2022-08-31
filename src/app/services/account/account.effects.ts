import { Router } from '@angular/router';
import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as AccountActions from './account.actions';
import { User } from '../../account/user.model';
import { AccountApiService } from './account-api.service';


const handleLogin = (
    username: string, 
    password: string, 
    token: string
) => {
    const user = new User(username, password, token);
    localStorage.setItem('userToken', JSON.stringify(token))
    return AccountActions.authenticateSucces({ user: user });
};

const handleError = (
    error: any
) => {
    let errorMessage = '';
    switch (error.error) {
        case 'username or password is incorrect':
            errorMessage = 'Username-ul sau parola sunt incorecte';
            break;
        default:
            errorMessage = 'Eroare necunoscuta!';
    }
    return of(AccountActions.authenticateFail({ authError: errorMessage }));
};

@Injectable()
export class AccountEffects {

    constructor (
        private actions$: Actions,
        private router: Router,
        private accountApiService: AccountApiService
    ) {}

    accountLogin$ = createEffect(() => 
        this.actions$.pipe(
            
            ofType(AccountActions.loginStart),
            switchMap((accountData) => {
                    return this.accountApiService.login(
                        accountData.user.username,
                        accountData.user.password
                    )
                .pipe (
                    map(resultData => {
                        return handleLogin(
                            accountData.user.username,
                            accountData.user.password,
                            resultData.token
                        );
                    }),
                    catchError(errorResult => {
                        return handleError(errorResult)
                    })
                );
            })

        )
    );
    
    accountAuthenticateSucces$ = createEffect(() => 
        this.actions$.pipe(

            ofType(AccountActions.authenticateSucces),
            tap( () => {
                this.router.navigate(['/']);
            })
        ),
        { dispatch: false }
    );
}

