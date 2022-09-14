import { ICart } from './cart.interface';
import { createReducer, on, ActionReducerMap } from '@ngrx/store';
import * as CartActions from './cart.actions';
import * as CartUtils from './cart.utils';

export const cartFeatureKey = 'cart';

export interface State {
  activeCart: ICart | undefined;
}

export const initialState: State = {
  activeCart: undefined,
};

export const reducer = createReducer(
  initialState,
  on(CartActions.loadCart, (state) => {
    return {
      ...state,
      activeCart: CartUtils.loadCartHelper({ ...state.activeCart }),
    };
  }),
  on(CartActions.addProduct, (state, action) => {
    return {
      ...state,
      activeCart: {
        ...state.activeCart,
        products: CartUtils.addProductHelper(
          action.product,
          state.activeCart?.products!
        ),
      },
    };
  }),
  on(CartActions.removeProduct, (state, action) => {
    return {
      ...state,
      activeCart: {
        ...state.activeCart,
        products: CartUtils.removeProductHelper(
          action.productId,
          state.activeCart?.products!
        ),
      },
    };
  }),
  on(CartActions.setProductQuantity, (state, action) => {
    return {
      ...state,
      activeCart: {
        ...state.activeCart,
        products: CartUtils.setProductQuantityHelper(
          action.product,
          state.activeCart?.products!
        ),
      },
    };
  }),
  on(CartActions.setDiscountPercentage, (state, action) => {
    return {
      ...state,
      activeCart: {
        ...state.activeCart,
        discountPercentage: action.discountPercentage,
      },
    };
  })
);

export const cartReducers: ActionReducerMap<{ cart: State }> = {
  cart: reducer,
};
