import { IBrand } from './../models/brand.interface';
import { ProductModel } from './../models/product.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, take } from 'rxjs';

import { IPriceRange } from '../models/price-range.interface';

@Injectable()
export class ProductService {
  private readonly baseURL = 'https://fakestoreapi.com/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductModel[]> {
    return this.http.get(`${this.baseURL}products`).pipe(
      map((products: ProductModel[]) => {
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
      map((products: ProductModel[]) => {
        return {
          min: Math.min(...products.map((product) => product.price)),
          max: Math.max(...products.map((product) => product.price)),
        };
      })
    );
  }

  getBrands(): Observable<{}> {
    return this.getAll().pipe(
      map((products: ProductModel[]) => {
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
      map((products: ProductModel[]) => {
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
