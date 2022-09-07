import { IFilterGroup } from '../../product-list/models/filter-group.interface';
import { createAction, props } from '@ngrx/store';
import { IOrderGroup } from '../../product-list/models/order-group.interface';

export const enterWithSearch = createAction(
  '[Product List Page] Enter With Search',
  props<{ key: string }>()
);

export const enterWithCategory = createAction(
  '[Product List Page] Enter With Category',
  props<{ category: string }>()
);

export const addProductToFavorites = createAction(
  '[Product List Page] Product Added To Favorite',
  props<{ productId: number }>()
);

export const removeProductFromFavorites = createAction(
  '[Product List Page] Product Removed From Favorites',
  props<{ productId: number }>()
);

export const orderProducts = createAction(
  '[Prodict List Page] Products Ordered',
  props<{ orderGroup: IOrderGroup }>()
);

export const filterProducts = createAction(
  '[Prodict List Page] Products Filtered',
  props<{ filterGroup: IFilterGroup }>()
);
