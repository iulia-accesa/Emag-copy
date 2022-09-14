import { ICartProduct } from './cart-product.interface';
import { ICart } from './cart.interface';
import { createAction, props } from '@ngrx/store';

export const loadCart = createAction('[Cart] Load Cart');

export const addProduct = createAction(
  '[Cart] Product Added',
  props<{ product: ICartProduct }>()
);

export const removeProduct = createAction(
  '[Cart] Product Removed',
  props<{ productId: number }>()
);

export const setProductQuantity = createAction(
  '[Cart] Product Quantity Set',
  props<{ product: ICartProduct }>()
);

export const setDiscountPercentage = createAction(
  '[Cart] Discount Percentage Set',
  props<{ discountPercentage: number }>()
);

export const placeOrder = createAction(
  '[Cart] Place Order',
  props<{ order: ICart }>()
);

export const placeOrderSuccess = createAction(
  '[Cart] Place Order Success',
  props<{ order: ICart }>()
);

export const placeOrderFailure = createAction(
  '[Cart] Place Order Failure',
  props<{ error: string }>()
);
