import { createFeatureSelector, createSelector } from "@ngrx/store";
import { searchResultFeatureKey } from "./search.feature-key";
import * as fromReducer from './search.reducer'
export const selectSearchResultState = createFeatureSelector<fromReducer.State>(searchResultFeatureKey);

export const searchResult = createSelector(
    selectSearchResultState,
    result => result.searchResult
)

