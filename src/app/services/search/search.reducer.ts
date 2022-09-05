import { ActionReducerMap, createReducer, on } from '@ngrx/store';

import { SearchBarProduct } from './searchbar-product.interface';
import * as fromActions from './search.actions';

export const searchResultFeatureKey = 'search';
export interface State {
  searchResult: SearchBarProduct[];
}

export const initState: State = {
  searchResult: [],
};
export const reducer = createReducer(
  initState,
  on(fromActions.inputChanged, (state, action) => {
    return {
      searchResult: state.searchResult,
    };
  }),
  on(fromActions.updateSearchResult, (state, action) => {
    return {
      searchResult: action.payload,
    };
  }),
  on(fromActions.searchFailed, (state, action) => {
    return {
      searchResult: [],
    };
  })
);

export const searchReducers: ActionReducerMap<{ search: State }> = {
  search: reducer,
};
