import { createFeatureSelector, createSelector } from "@ngrx/store";

import * as fromReducer from './search.reducer'

export const selectSearchResultState = createFeatureSelector<fromReducer.State>(fromReducer.searchResultFeatureKey);

export const searchResult = createSelector(
    selectSearchResultState,
    result => result.searchResult
)

