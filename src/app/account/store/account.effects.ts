import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AccountActions from './account.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { User } from '../user.model';

export interface AccountResponseData {
    token: string;
}

const handleLogin = (
    username: string, 
    password: string, 
    token: string
) => {
    const user = new User(username, password, token);
    localStorage.setItem('userToken', JSON.stringify(token))
    return AccountActions.AuthenticateSucces({ user: user });
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
    return of(AccountActions.AuthenticateFail({ authError: errorMessage }));
};

@Injectable()
export class AccountEffects {

    constructor (
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
    ) {}

    accountLogin$ = createEffect(() => 
        this.actions$.pipe(
            ofType(AccountActions.LoginStart),
            switchMap((accountData) => {
                return this.http.post<AccountResponseData>(
                    'https://fakestoreapi.com/auth/login', 
                    {
                        username: accountData.user.username,
                        password: accountData.user.password
                    })
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
            ofType(AccountActions.AuthenticateSucces),
            tap( () => {
                this.router.navigate(['/']);
            })
        ),
        { dispatch: false }
    );
}

