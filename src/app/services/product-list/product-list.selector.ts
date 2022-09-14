import { FEATURE_KEY } from './product-list.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './product-list.reducer';

export const selectProductsFeature = createFeatureSelector<State>(FEATURE_KEY);

export const selectProductsState = createSelector(
  selectProductsFeature,
  (productsFeatureState) => {
    return productsFeatureState;
  }
);

export const selectAllProducts = createSelector(
  selectProductsState,
  (productsState) => productsState.productList
);

export const selectOrderGroup = createSelector(
  selectProductsState,
  (productsState) => productsState.orderGroup
);

export const selectFilterGroup = createSelector(
  selectProductsState,
  (productsState) => productsState.filterGroup
);
