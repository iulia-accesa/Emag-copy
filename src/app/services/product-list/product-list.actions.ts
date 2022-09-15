import { createAction, props } from '@ngrx/store';
import { IProductApi } from 'src/app/shared/models/product-api.interface';

export const productsInitSuccess = createAction(
  '[Product Service] Products Initialized Success',
  props<{
    products: IProductApi[];
  }>()
);

export const productsInitFailure = createAction(
  '[Product Service] Products Initialized Failure',
  props<{
    error: string;
  }>()
);

export const enterWithSearch = createAction(
  '[Product List Page] Enter With Search',
  props<{ key: string }>()
);

export const enterWithCategory = createAction(
  '[Product List Page] Enter With Category',
  props<{ category: string }>()
);

export const orderAndFilterProducts = createAction(
  '[Product List Page] Products Ordered And Filtered',
  props<{
    products: IProductApi[];
  }>()
);
