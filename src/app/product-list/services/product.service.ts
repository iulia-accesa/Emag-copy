import { ProductModel } from './../models/product.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { max, Observable, of } from 'rxjs';

@Injectable()
export class ProductService {
  private readonly baseURL = 'https://fakestoreapi.com/';
  constructor(private http: HttpClient) {
    console.log(this.getPriceRange());
  }

  getAll(): Observable<ProductModel[]> {
    return this.http.get(`${this.baseURL}products`) as Observable<
      ProductModel[]
    >;
  }

  getPriceRange() {
    this.getAll().subscribe((products: ProductModel[]) => {
      let priceRange = { min: 1, max: 19999999 };

      let minPrice = products[0].price;
      let maxPrice = minPrice;

      products.forEach((product) => {
        console.log(product);
        if (product.price < minPrice) minPrice = product.price;
        if (product.price > maxPrice) maxPrice = product.price;
      });

      priceRange.min = minPrice;
      priceRange.max = maxPrice;

      return of(priceRange);
    });
  }
}
