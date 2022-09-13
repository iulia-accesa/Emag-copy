import { ICartProduct } from './cart-product.interface';
import { ICart } from './cart.interface';
import { Action, createReducer, on, ActionReducerMap } from '@ngrx/store';
import * as CartActions from './cart.actions';

export const cartFeatureKey = 'cart';

export interface State {
  activeCart: ICart | undefined;
}

export const initialState: State = {
  activeCart: undefined,
};

const loadCartHelper = (activeCart: ICart): ICart => {
  if (Object.keys(activeCart).length) {
    return { ...activeCart };
  }

  return {
    userId: undefined,
    date: undefined,
    products: [],
    discountPercentage: 0,
    shipping: 15,
  };
};

export const reducer = createReducer(
  initialState,
  on(CartActions.loadCart, (state) => {
    return {
      ...state,
      activeCart: loadCartHelper({ ...state.activeCart }),
    };
  }),
  on(CartActions.addProduct, (state, action) => {
    return {
      ...state,
      activeCart: {
        ...state.activeCart,
        products: [...state.activeCart?.products!, action.product],
      },
    };
  }),
  on(CartActions.removeProduct, (state, action) => {
    let productState = [...state.activeCart?.products!];
    productState.splice(action.productPosition, 1);

    return {
      ...state,
      activeCart: {
        ...state.activeCart,
        products: productState,
      },
    };
  }),
  on(CartActions.setProductQuantity, (state, action) => {
    console.log(state, action);
    let productState = [...state.activeCart?.products!];
    productState.splice(action.productPosition, 1, action.product);

    return {
      ...state,
      activeCart: {
        ...state.activeCart,
        products: productState,
      },
    };
  })
);

export const cartReducers: ActionReducerMap<{ cart: State }> = {
  cart: reducer,
};
