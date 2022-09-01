import { ActionReducerMap, createReducer, on } from '@ngrx/store';

import * as AccountActions from './account.actions';

export const accountFeatureKey = 'account';

export interface State {
    username?: string | undefined,
    token?: string | undefined,
}

const initialState: State = {
    username: undefined,
    token: undefined,
};

export const reducer = createReducer(
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

export const accountReducers: ActionReducerMap<{account: State}> = {
  account: reducer
};
