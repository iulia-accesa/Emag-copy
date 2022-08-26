import { createFeatureSelector, createSelector } from "@ngrx/store";
import { searchResultFeatureKey } from "../features";
import * as fromSearch from '../reducers/index'
export const selectSearchResultState = createFeatureSelector<fromSearch.State>(searchResultFeatureKey);

export const searchResult = createSelector(
    selectSearchResultState,
    result => result.searchResult
)
