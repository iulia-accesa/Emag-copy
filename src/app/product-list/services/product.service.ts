import { ProductModel } from './../models/product.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {
  private readonly baseURL = 'https://fakestoreapi.com/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<ProductModel[]> {
    return this.http.get(`${this.baseURL}products`) as Observable<
      ProductModel[]
    >;
  }
}
