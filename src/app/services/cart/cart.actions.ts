import { ICart } from './../../shared/models/cart.interface';
import { createAction, props } from '@ngrx/store';
import { ICartProduct } from 'src/app/shared/models/cart-product.interface';

export const loadCarts = createAction('[Cart] Load Carts');

export const loadCartsSuccess = createAction(
  '[Cart] Load Carts Success',
  props<{ userID: number; carts: ICart[] }>()
);

export const loadCartsFailure = createAction(
  '[Cart] Load Carts Failure',
  props<{ error: any }>()
);

export const addProductToCartSuccess = createAction(
  '[Cart] Add To Cart Success',
  props<{ cartProduct: ICartProduct }>()
);

export const addProductToCartFailure = createAction(
  '[Cart] Add To Cart Failed',
  props<{ error: any }>()
);
