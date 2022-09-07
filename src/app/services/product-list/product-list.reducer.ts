import { IOrderGroup } from '../../product-list/models/order-group.interface';
import { IFilterGroup } from '../../product-list/models/filter-group.interface';
import { Order } from '../../product-list/models/order.type';
import { IPriceRange } from '../../product-list/models/price-range.interface';
import { IProduct } from '../../shared/models/product.interface';

import { createReducer, on, Action, ActionReducerMap } from '@ngrx/store';

import * as ProductListPageActions from './product-list.actions';
import * as ProductServiceActions from './product-list-service.actions';

export const FEATURE_KEY = 'product_list';

/**
 * State Shape
 */
export interface State {
  productListConstant: IProduct[];
  productList: IProduct[];
  favoriteIdList: number[];
  cartIdList: number[];
  filterGroup: IFilterGroup;
  orderGroup: IOrderGroup;
}

export const initialState: State = {
  productListConstant: [],
  productList: [],
  favoriteIdList: [],
  cartIdList: [],
  filterGroup: {
    priceRange: undefined,
    ratings: undefined,
  },
  orderGroup: {
    price: undefined,
    title: undefined,
  },
};

/**
 * Helper functions for the reducers
 */
const removeFromFavorites = (favoriteIdList: number[], favId: number) => {
  return favoriteIdList.filter((id) => id !== favId);
};

const orderByPrice = (products: IProduct[], order: Order | ''): IProduct[] => {
  if (order) {
    const mark = order === 'asc' ? 1 : -1;
    return [...products].sort((a: IProduct, b: IProduct) => {
      if (a.price < b.price) {
        return -1 * mark;
      } else if (a.price > b.price) {
        return 1 * mark;
      }
      return 0;
    });
  }

  return [...products];
};

const orderByTitle = (products: IProduct[], order: Order): IProduct[] => {
  if (order) {
    const mark = order === 'asc' ? 1 : -1;
    return [...products].sort((a: IProduct, b: IProduct) => {
      if (a.title < b.title) {
        return -1 * mark;
      } else if (a.title > b.title) {
        return 1 * mark;
      }
      return 0;
    });
  }
  return [...products];
};

const filterByPrice = (
  products: IProduct[],
  priceRange: IPriceRange
): IProduct[] => {
  if (priceRange) {
    return [...products].filter((product) => {
      return product.price >= priceRange.min && product.price < priceRange.max;
    });
  }
  return products;
};

const filterByRating = (products: IProduct[], ratings: any[]): IProduct[] => {
  let filteredProducts = [...products];
  if (ratings) {
    filteredProducts = products.filter((product) => {
      let i = Math.round(product.rating.rate);
      i--;
      if (i <= 0) i++;
      return ratings[i] === true;
    });
  }
  return filteredProducts.length > 0 ? filteredProducts : [...products];
};

const filterAndOrderProducts = (
  products: IProduct[],
  filterGroup: IFilterGroup,
  orderGroup: IOrderGroup
): IProduct[] => {
  products = filterByPrice(products, filterGroup.priceRange);
  products = filterByRating(products, filterGroup.ratings);
  products = orderByPrice(products, orderGroup.price);
  products = orderByTitle(products, orderGroup.title);

  return products;
};

/**
 * Reducers
 */
export const productReducer = createReducer(
  initialState,
  on(ProductListPageActions.enterWithCategory, (state) => {
    return { ...state };
  }),
  on(ProductListPageActions.enterWithSearch, (state) => {
    return { ...state };
  }),
  on(ProductListPageActions.addProductToFavorites, (state, action) => {
    return {
      ...state,
      favoriteIdList: [...state.favoriteIdList, action.productId],
    };
  }),
  on(ProductListPageActions.removeProductFromFavorites, (state, action) => {
    return {
      ...state,
      favoriteIdList: removeFromFavorites(
        state.favoriteIdList,
        action.productId
      ),
    };
  }),
  on(ProductListPageActions.filterProducts, (state, action) => {
    console.log(action);
    return {
      ...state,
      filterGroup: action.filterGroup,
      productList: filterAndOrderProducts(
        state.productListConstant,
        action.filterGroup,
        state.orderGroup
      ),
    };
  }),
  on(ProductListPageActions.orderProducts, (state, action) => {
    return {
      ...state,
      orderGroup: action.orderGroup,
      productList: filterAndOrderProducts(
        state.productListConstant,
        state.filterGroup,
        action.orderGroup
      ),
    };
  }),
  on(ProductServiceActions.productsInit, (state, action) => {
    return {
      ...state,
      productListConstant: action.products,
      productList: action.products,
    };
  })
);

export const productListReducer: ActionReducerMap<{ product_list: State }> = {
  product_list: productReducer,
};
