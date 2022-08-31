import { User } from './../user.model';
import { createReducer, on } from '@ngrx/store';
import * as fromAccount from './account.actions';

export interface State {
    user: User;
    authError: string;
    loading: boolean;
};

const initialState: State = {
    user: null,
    authError: null,
    loading: false
};

export const accountReducer = createReducer(
    initialState,

    on (fromAccount.LoginStart, (state) => {
        return {
            ...state, 
            authError: null,
            loading: true
        };
    }),

    on (fromAccount.AuthenticateSucces, (state, action) => {
        const user = new User(
            action.user.username,
            action.user.password,
            action.user.token
        );
        return {
            ...state,
            user: user,
            authError: null,
            loading: false
        };
    }),

    on (fromAccount.AuthenticateFail, (state, action) => {
        return {
            ...state, 
            user: null, 
            authError: action.authError,
            loading: false
        };
    })
);
