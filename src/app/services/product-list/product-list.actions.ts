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

export const orderProducts = createAction(
  '[Prodict List Page] Products Ordered',
  props<{ products: IProductApi[]; orderGroup: IOrderGroup }>()
);

export const filterProducts = createAction(
  '[Prodict List Page] Products Filtered',
  props<{ products: IProductApi[]; filterGroup: IFilterGroup }>()
);
