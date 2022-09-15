import { createSelector } from '@ngrx/store';
import { createFeatureSelector } from '@ngrx/store';

import * as fromHistory from './history.reducer';

export const selectHistoryState = createFeatureSelector<fromHistory.State>(
    fromHistory.historyFeatureKey
);

export const getProductList = createSelector(
    selectHistoryState,
    history => history?.productHistory || []
);