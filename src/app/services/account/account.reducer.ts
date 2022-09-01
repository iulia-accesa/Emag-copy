import { createReducer, on } from '@ngrx/store';

import * as AccountActions from './account.actions';

export const accountFeatureKey = 'account';

export interface State {
    username: string;
    token: string
};

const initialState: State = {
    username: '',
    token: '',
};

export const accountReducer = createReducer(
    initialState,

    on (AccountActions.loginStart, state => ({ ...state})),
    on (AccountActions.authenticateSucces, (state, action) => ({
            ...state,
            username: action.username,
            token: action.token,
        })
    ),
    on (AccountActions.authenticateFail, state => ({
            ...state, 
            username: '',
            token: '',
    })
    )
);
