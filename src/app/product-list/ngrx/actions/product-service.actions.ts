import { IBrand } from './../../models/brand.interface';
import { IPriceRange } from './../../models/price-range.interface';
import { IProduct } from './../../../shared/models/product.interface';
import { createAction, props } from '@ngrx/store';

export const productsLoaded = createAction(
  '[Product Service] Products Loaded Success',
  props<{ products: IProduct[] }>()
);

export const priceRangeLoaded = createAction(
  '[Product Service] Price Range Loaded Success',
  props<{ range: IPriceRange }>()
);

export const brandsLoaded = createAction(
  '[Product Service] Brands Loaded Success',
  props<{ brands: IBrand[] }>()
);

export const ratingCountLoaded = createAction(
  '[Product Service] Rating Count Loaded Success',
  props<{ ratings: number[] }>()
);

export const favoriteProductsLoaded = createAction(
  '[Product Service] Favorite Products Loaded Success',
  props<{ productIds: number[] }>()
);

export const cartItemsLoaded = createAction(
  '[Product Service] Cart Items Loaded Success',
  props<{ productIds: number[] }>()
);
