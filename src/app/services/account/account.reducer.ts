import { createReducer, on } from '@ngrx/store';

import { User } from '../../account/user.model';
import * as fromAccount from './account.actions';

export const accountFeatureKey = 'account';

export interface State {
    user: User;
    authError: string;
    loading: boolean;
};

const nullUser: User = new User ('', '',)

const initialState: State = {
    user: nullUser,
    authError: '',
    loading: false
};


export const accountReducer = createReducer(
    initialState,

    on (fromAccount.loginStart, (state) => {
        return {
            ...state, 
            authError: '',
            loading: true
        };
    }),

    on (fromAccount.authenticateSucces, (state, action) => {
        const user = new User(
            action.user.username,
            action.user.password,
            action.user.token
        );
        return {
            ...state,
            user: user,
            authError: '',
            loading: false
        };
    }),

    on (fromAccount.authenticateFail, (state, action) => {
        return {
            ...state, 
            user: nullUser, 
            authError: action.authError,
            loading: false
        };
    })
);
