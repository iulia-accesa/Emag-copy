import { IBrand } from './../../models/brand.interface';
import { IPriceRange } from './../../models/price-range.interface';
import { createAction, props } from '@ngrx/store';
import { ProductModel } from '../../models/product.model';
import { Order } from '../../models/order.type';

export const enter = createAction('[Product List Page] Enter');

export const markProductAsFavorite = createAction(
  '[Product List Page]',
  props<{ productId: number }>()
);

export const orderByPrice = createAction(
  '[Product List Page]',
  props<{ order: Order }>()
);

export const filterByPrice = createAction(
  '[Product List Page]',
  props<{ range: IPriceRange }>()
);

export const filterByBrands = createAction(
  '[Product List Page]',
  props<{ brands: IBrand[] }>()
);

export const filterByRatings = createAction(
  '[Product List Page]',
  props<{ ratings: number[] }>()
);
