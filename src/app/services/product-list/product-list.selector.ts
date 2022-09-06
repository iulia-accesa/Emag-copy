import { FEATURE_KEY } from './product-list.reducer';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from './product-list.reducer';

/**
 * Feature Selector
 */
export const selectProductsFeature = createFeatureSelector<State>(FEATURE_KEY);

/**
 * Product State Selector
 */
export const selectProductsState = createSelector(
  selectProductsFeature,
  (productsFeatureState) => {
    return productsFeatureState;
  }
);

/**
 * Product Selectors
 */
export const selectAllProducts = createSelector(
  selectProductsState,
  (productsState) => productsState.productList
);
