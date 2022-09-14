import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCart from './cart.reducer';

export const selectCartState = createFeatureSelector<fromCart.State>(
  fromCart.cartFeatureKey
);

export const selectProductList = createSelector(
  selectCartState,
  (state) => state.products || []
);

export const selectDiscountPercentage = createSelector(
  selectCartState,
  (state) => state.discountPercentage || 0
);

export const selectShipping = createSelector(
  selectCartState,
  (state) => state.shipping || 0
);
