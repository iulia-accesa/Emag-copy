import { IProduct } from '../../shared/models/product.interface';
import { createAction, props } from '@ngrx/store';

export const productsInit = createAction(
  '[Product Service] Products Initialized Success',
  props<{
    products: IProduct[];
  }>()
);

export const cartItemsLoaded = createAction(
  '[Product Service] Cart Items Loaded Success',
  props<{ productIds: number[] }>()
);
