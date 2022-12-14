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
import { ProductListUiService } from './product-list-ui.service';

@Injectable()
export class ProductListService {
  constructor(
    private store: Store,
    private productListUiService: ProductListUiService
  ) {}

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
    minRating: number
  ): IProductApi[] {
    let filteredProducts = [...products];
    if (minRating) {
      filteredProducts = products.filter(
        (product) => Math.round(product.rating.rate) >= minRating
      );
    }
    return filteredProducts.length > 0 ? filteredProducts : [...products];
  }

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
    this.productListUiService.productListLoading.next(true);
    this.productListUiService.productListError.next(false);
    this.store.dispatch(
      ProductListActions.enterWithCategory({
        category,
      })
    );
  }

  enterWithSearch(key: string) {
    this.productListUiService.productListLoading.next(true);
    this.productListUiService.productListError.next(false);
    this.store.dispatch(ProductListActions.enterWithSearch({ key }));
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
        if (filterGroup.minRating)
          products = this.filterByRating(products, filterGroup.minRating);
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
