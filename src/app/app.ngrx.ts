import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { accountReducers } from './services/account/account.reducer';
import { productListReducer } from './services/product-list/product-list.reducer';

export const APP_REDUCERS = { ...accountReducers, ...productListReducer };

const SyncLocalStorage = localStorageSync({
  keys: ['account'],
  rehydrate: true,
  storage: localStorage,
});

export function localStorageSyncWrapper(reducer: any): ActionReducer<any, any> {
  return (state, action) => {
    const newReducer = SyncLocalStorage(reducer);
    return newReducer(state, action);
  };
}
