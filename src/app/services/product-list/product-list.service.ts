import { Store } from '@ngrx/store';

import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { IPriceRange } from '../../product-list/models/price-range.interface';
import { IProductApi } from 'src/app/shared/models/product-api.interface';

import * as ProductListSelectors from './product-list.selector';
import * as ProductListActions from './product-list.actions';

import { IOrderGroup } from 'src/app/product-list/models/order-group.interface';
import { IFilterGroup } from 'src/app/product-list/models/filter-group.interface';
import { Order } from 'src/app/product-list/models/order.type';

@Injectable()
export class ProductListService {
  constructor(private store: Store) {}

  getProductList(): Observable<IProductApi[]> {
    return this.store.select(ProductListSelectors.selectAllProducts);
  }

  getPriceRange(): Observable<IPriceRange> {
    return this.store
      .select(ProductListSelectors.selectAllInitialProducts)
      .pipe(
        map((products: IProductApi[]) => {
          if (products.length === 0)
            return {
              min: 1,
              max: 999999,
            };

          return {
            min: Math.min(...products.map((product) => product.price)),
            max: Math.max(...products.map((product) => product.price)),
          };
        })
      );
  }

  getRatingCount(): Observable<number[]> {
    return this.store
      .select(ProductListSelectors.selectAllInitialProducts)
      .pipe(
        map((products: IProductApi[]) => {
          let ratingCount = [0, 0, 0, 0, 0];

          products.forEach((product) => {
            let i = Math.round(product.rating.rate);
            if (i > 0) i--;
            ratingCount[i]++;
          });
          return ratingCount;
        })
      );
  }

  enterWithCategory(category: string) {
    this.store.dispatch(
      ProductListActions.enterWithCategory({
        category,
      })
    );
  }

  enterWithSearch(key: string) {
    this.store.dispatch(ProductListActions.enterWithSearch({ key }));
  }

  private orderByPrice(
    products: IProductApi[],
    order: Order | ''
  ): IProductApi[] {
    if (order) {
      const mark = order === 'asc' ? 1 : -1;
      return [...products].sort((a: IProductApi, b: IProductApi) => {
        if (a.price < b.price) {
          return -1 * mark;
        } else if (a.price > b.price) {
          return 1 * mark;
        }
        return 0;
      });
    }

    return [...products];
  }

  private orderByTitle = (
    products: IProductApi[],
    order: Order
  ): IProductApi[] => {
    if (order) {
      const mark = order === 'asc' ? 1 : -1;
      return [...products].sort((a: IProductApi, b: IProductApi) => {
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

  private filterByPrice(
    products: IProductApi[],
    priceRange: IPriceRange
  ): IProductApi[] {
    if (priceRange) {
      return [...products].filter((product) => {
        return (
          product.price >= priceRange.min && product.price < priceRange.max
        );
      });
    }
    return products;
  }

  private filterByRating(
    products: IProductApi[],
    ratings: any[]
  ): IProductApi[] {
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
  }

  filterAndOrderProducts(
    filterGroup: IFilterGroup,
    orderGroup: IOrderGroup
  ): void {
    this.store
      .select(ProductListSelectors.selectAllInitialProducts)
      .subscribe((products) => {
        if (filterGroup.priceRange)
          products = this.filterByPrice(products, filterGroup.priceRange);
        if (filterGroup.ratings)
          products = this.filterByRating(products, filterGroup.ratings);
        if (orderGroup.price)
          products = this.orderByPrice(products, orderGroup.price);
        if (orderGroup.title)
          products = this.orderByTitle(products, orderGroup.title);

        this.store.dispatch(
          ProductListActions.orderAndFilterProducts({
            products,
          })
        );
      });
  }
}
