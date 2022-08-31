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

  getPriceRange() {}
}
