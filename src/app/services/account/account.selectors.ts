import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';

import * as fromAccount from './account.reducer';

export const selectAccountState = createFeatureSelector<fromAccount.State>(
    fromAccount.accountFeatureKey
);

export const getUser = createSelector(
    selectAccountState,
    account => account.user
);

export const getIsLoading = createSelector(
    selectAccountState,
    account => account.loading
);

export const getAuthError = createSelector(
    selectAccountState,
    account => account.authError
);