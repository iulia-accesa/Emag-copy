import * as fromProducts from './reducers/products.reducer';
import { FEATURE_KEY } from './feature-key';
import {
  ActionReducerMap,
  StoreModule,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import { NgModule } from '@angular/core';

import * as productSelectors from './selectors/products.selector';

export interface State {
  product_list: fromProducts.State;
}

export const reducers: ActionReducerMap<State> = {
  product_list: fromProducts.reducer,
};

@NgModule({
  imports: [StoreModule.forFeature(FEATURE_KEY, fromProducts.reducer)],
})
export class StateProductListModule {}

/**
 * Feature Selector
 */
export const selectProductsFeature = createFeatureSelector<
  State,
  fromProducts.State
>(FEATURE_KEY);

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
  (productsState) => productSelectors.selectAllProducts(productsState)
);
