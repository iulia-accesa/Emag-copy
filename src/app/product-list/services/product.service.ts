import { ProductApiService } from './../../services/product-api.service';

import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';

import { IPriceRange } from '../models/price-range.interface';
import { IProduct } from './../../shared/models/product.interface';
import { IBrand } from './../models/brand.interface';
import { IProductApi } from 'src/app/shared/models/product-api.interface';

@Injectable()
export class ProductService {
  constructor(private productApiService: ProductApiService) {}

  private productsMatchesSearchKey(
    product: IProductApi,
    searchKey: string
  ): boolean {
    return (
      searchKey !== '' &&
      (product.title.toLowerCase().startsWith(searchKey.toLowerCase()) ||
        product.title
          .toLowerCase()
          .split(' ')
          .includes(searchKey.toLowerCase()) ||
        product.description
          .toLowerCase()
          .split(' ')
          .includes(searchKey.toLowerCase()))
    );
  }

  getAll(): Observable<IProduct[]> {
    return this.productApiService.getAll().pipe(
      map((products: IProduct[]) => {
        return products.map((product) => {
          return {
            ...product,
            favorite: false,
          };
        });
      })
    );
  }

  getByCategory(category: string): Observable<IProduct[]> {
    return this.productApiService.getByCategory(category).pipe(
      map((products: IProduct[]) => {
        return products.map((product) => {
          return {
            ...product,
            favorite: false,
          };
        });
      })
    );
  }

  getBySearch(searchKey: string): Observable<IProduct[]> {
    return this.productApiService
      .getAll()
      .pipe(
        map((products: IProduct[]) =>
          products.filter((product) =>
            this.productsMatchesSearchKey(product, searchKey)
          )
        )
      );
  }

  getPriceRange(): Observable<IPriceRange> {
    return this.getAll().pipe(
      map((products: IProduct[]) => {
        return {
          min: Math.min(...products.map((product) => product.price)),
          max: Math.max(...products.map((product) => product.price)),
        };
      })
    );
  }

  getRatingCount(): Observable<number[]> {
    return this.getAll().pipe(
      map((products: IProduct[]) => {
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

  getFavoriteProductIds(): Observable<number[]> {
    const storageFavList = localStorage.getItem('favoriteItemList');
    const productIds: number[] = storageFavList
      ? JSON.parse(storageFavList)
      : [];

    return of(productIds);
  }

  getCartItemIds(): Observable<number[]> {
    const storageCartItemList = localStorage.getItem('cartItemList');
    const productIds: number[] = storageCartItemList
      ? JSON.parse(storageCartItemList)
      : [];

    return of(productIds);
  }
}
