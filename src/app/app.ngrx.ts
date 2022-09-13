import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';

import { accountReducers } from './services/account/account.reducer';
import { historyReducer } from './services/navigation-history/history.reducer';
import { searchReducers } from './services/search/search.reducer';

export const APP_REDUCERS = { ...accountReducers, ...searchReducers, ...historyReducer };

const SyncLocalStorage = localStorageSync({
  keys: ['account', 'history'], rehydrate: true, storage: localStorage
});

export function localStorageSyncWrapper(reducer: any): ActionReducer<any, any> {
  return (state, action) => {
    const newReducer = SyncLocalStorage(reducer);
    return newReducer(state, action);
  };
};


