import { IProductApi } from 'src/app/shared/models/product-api.interface';
import { IOrderGroup } from '../../product-list/models/order-group.interface';
import { IFilterGroup } from '../../product-list/models/filter-group.interface';

import { createReducer, on, ActionReducerMap } from '@ngrx/store';

import * as ProductListPageActions from './product-list.actions';

export const FEATURE_KEY = 'product_list';

/**
 * State Shape
 */
export interface State {
  productListConstant: IProductApi[];
  productList: IProductApi[];
}

export const initialState: State = {
  productListConstant: [],
  productList: [],
};

export const productReducer = createReducer(
  initialState,
  on(ProductListPageActions.productsInit, (state, action) => {
    return {
      ...state,
      productListConstant: action.products,
      productList: action.products,
    };
  }),
  on(ProductListPageActions.enterWithCategory, (state) => {
    return { ...state };
  }),
  on(ProductListPageActions.enterWithSearch, (state) => {
    return { ...state };
  }),
  on(ProductListPageActions.orderAndFilterProducts, (state, action) => {
    return {
      ...state,
      productList: action.products,
    };
  })
);

export const productListReducer: ActionReducerMap<{ product_list: State }> = {
  product_list: productReducer,
};
