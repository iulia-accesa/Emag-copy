import { IOrderGroup } from './../../models/order-group.interface';
import { IFilterGroup } from './../../models/filter-group.interface';
import { Order } from './../../models/order.type';
import { IPriceRange } from './../../models/price-range.interface';
import { IProduct } from './../../../shared/models/product.interface';

import { createReducer, on, Action } from '@ngrx/store';

import * as ProductListPageActions from '../actions/product-list-page.actions';
import * as ProductServiceActions from '../actions/product-service.actions';

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
    // if (ratings.every((rating) => rating === '' || rating === false)) {
    //   // return [...products];
    //   // console.log('empty', ratings);
    // }

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

export const productReducer = createReducer(
  initialState,
  on(ProductListPageActions.enter, (state) => {
    // For now there's no change needed on entering the page
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

export function reducer(state: State | undefined, action: Action) {
  return productReducer(state, action);
}
