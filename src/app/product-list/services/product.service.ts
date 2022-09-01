import { ProductApiService } from './../../services/product-api.service';

import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { IPriceRange } from '../models/price-range.interface';
import { IProduct } from './../../shared/models/product.interface';
import { IBrand } from './../models/brand.interface';

@Injectable()
export class ProductService {
  constructor(private productApiService: ProductApiService) {}

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

  getBrands(): Observable<{}> {
    return this.getAll().pipe(
      map((products: IProduct[]) => {
        let brands: IBrand[] = [];
        products.forEach((product) => {
          const i = brands.findIndex((brand) => brand.name === product.title);
          if (i === -1) {
            brands.push({
              name: product.title,
              count: 1,
            });
          } else {
            brands[i].count++;
          }
        });
        return brands;
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
