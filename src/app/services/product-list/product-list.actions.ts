import { IFilterGroup } from '../../product-list/models/filter-group.interface';
import { createAction, props } from '@ngrx/store';
import { IOrderGroup } from '../../product-list/models/order-group.interface';
import { IProductApi } from 'src/app/shared/models/product-api.interface';

export const productsInit = createAction(
  '[Product Service] Products Initialized Success',
  props<{
    products: IProductApi[];
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
