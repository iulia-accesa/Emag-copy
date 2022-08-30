import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAccount from './account/store/account.reducer';

export interface State {
    account: fromAccount.State;
};

export const appReducers: ActionReducerMap<State> = {
    account: fromAccount.accountReducer
};

