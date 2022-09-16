import { ICartProduct } from '../../shared/models/cart-product.interface';
import { createAction, props } from '@ngrx/store';

export enum CartActionTypes {
  LOAD_CART = '[Cart] Load Cart',
  UPDATE_PRODUCT_LIST = '[Cart] Product List Updated',
  SET_DISCOUNT_PERCENTAGE = '[Cart] Discount Percentage Set',
}

export const loadCart = createAction(CartActionTypes.LOAD_CART);

export const updateProductList = createAction(
  CartActionTypes.UPDATE_PRODUCT_LIST,
  props<{ productList: ICartProduct[] }>()
);

export const setDiscountPercentage = createAction(
  CartActionTypes.SET_DISCOUNT_PERCENTAGE,
  props<{ discountPercentage: number }>()
);
