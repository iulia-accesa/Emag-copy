import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';

import * as fromAccount from './account.reducer';

export const selectAccountState = createFeatureSelector<fromAccount.State>(
    fromAccount.accountFeatureKey
);

export const getUsername = createSelector(
    selectAccountState,
    account => account.username
);

export const getToken = createSelector(
    selectAccountState,
    account => account.token
);
