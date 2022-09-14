import { ICartProduct } from './cart-product.interface';
import { createReducer, on, ActionReducerMap } from '@ngrx/store';
import * as CartActions from './cart.actions';

export const cartFeatureKey = 'cart';

export interface State {
  products?: ICartProduct[];
  discountPercentage?: number;
  shipping?: number;
}

export const initialState: State = {
  products: [],
  discountPercentage: undefined,
  shipping: 15,
};

export const reducer = createReducer(
  initialState,
  on(CartActions.loadCart, (state) => {
    return {
      ...state,
    };
  }),
  on(CartActions.updateProductList, (state, action) => {
    return {
      ...state,
      products: action.productList,
    };
  }),
  on(CartActions.setDiscountPercentage, (state, action) => {
    return {
      ...state,
      discountPercentage: action.discountPercentage,
    };
  })
);

export const cartReducers: ActionReducerMap<{ cart: State }> = {
  cart: reducer,
};
