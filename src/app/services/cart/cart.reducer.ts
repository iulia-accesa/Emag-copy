import { ICart } from './../../shared/models/cart.interface';
import { Action, createReducer, on, ActionReducerMap } from '@ngrx/store';
import * as CartActions from './cart.actions';

export const cartFeatureKey = 'cart';

export interface State {
  carts: ICart[];
}

export const initialState: State = {
  carts: [],
};

export const reducer = createReducer(
  initialState,

  on(CartActions.loadCarts, (state) => {
    return { ...state };
  }),
  on(CartActions.loadCartsSuccess, (state, action) => {
    return {
      ...state,
      carts: action.carts,
    };
  }),
  on(CartActions.loadCartsFailure, (state, action) => {
    return {
      ...state,
      carts: [],
    };
  }),
  on(CartActions.addProductToCartSuccess, (state, action) => {
    return {
      ...state,
    };
  })
);

export const cartReducers: ActionReducerMap<{ cart: State }> = {
  cart: reducer,
};
