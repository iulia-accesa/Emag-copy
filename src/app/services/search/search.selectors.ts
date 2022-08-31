
export const selectSearchResultState = createFeatureSelector<fromSearch.State>(searchResultFeatureKey);

export const searchResult = createSelector(
    selectSearchResultState,
    result => result.searchResult
)

