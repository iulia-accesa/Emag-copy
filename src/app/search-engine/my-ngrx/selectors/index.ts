import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromSearch from '../reducers/index'
export const selectSearchResultState = createFeatureSelector<fromSearch.State>("searchResult");

export const searchResult = createSelector(
    selectSearchResultState,
    result => result.searchResult
)
