import { ICartProduct } from './../../shared/models/cart-product.interface';
import { ICart } from './../../shared/models/cart.interface';
import { Action, createReducer, on, ActionReducerMap } from '@ngrx/store';
import * as CartActions from './cart.actions';

export const cartFeatureKey = 'cart';

export interface State {
  activeCart: ICart;
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
  };
};

const addProductSuccessHelper = (cart: ICart, productId: number): ICart => {
  let updatedProducts = [...cart.products];
  const productPosition = updatedProducts.findIndex(
    (cart) => cart.productId === productId
  );

  if (productPosition !== -1) {
    let product = {
      ...updatedProducts[productPosition],
    };
    product.quantity++;
    updatedProducts[productPosition] = product;
  } else {
    updatedProducts.push({
      productId: productId,
      quantity: 1,
    });
  }

  return {
    ...cart,
    products: updatedProducts,
  };
};

const removeProductSuccessHelper = (cart: ICart, productId: number): ICart => {
  let updatedProducts = [...cart.products];
  const productPosition = updatedProducts.findIndex(
    (cart) => cart.productId === productId
  );

  if (productPosition !== -1) {
    let product = {
      ...updatedProducts[productPosition],
    };
    if (product.quantity > 1) {
      product.quantity--;
      updatedProducts[productPosition] = product;
    } else {
      updatedProducts.splice(productPosition, 1);
    }
  }

  return {
    ...cart,
    products: updatedProducts,
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
      activeCart: addProductSuccessHelper(state.activeCart, action.productId),
    };
  }),
  on(CartActions.removeProduct, (state, action) => {
    return {
      ...state,
      activeCart: removeProductSuccessHelper(
        state.activeCart,
        action.productId
      ),
    };
  })
);

export const cartReducers: ActionReducerMap<{ cart: State }> = {
  cart: reducer,
};
