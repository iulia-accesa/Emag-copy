import { ProductApiService } from '../product-api.service';

import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { IPriceRange } from '../../product-list/models/price-range.interface';
import { IProduct } from '../../shared/models/product.interface';
import { IProductApi } from 'src/app/shared/models/product-api.interface';

@Injectable()
export class ProductListService {
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
}
