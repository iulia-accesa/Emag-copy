import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from 'src/app/shared/models';  

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //private _url: string = '/assets/data/product.json';
  products: Array<IProduct> = [
    {
      id: 1,
      title: 'iPhone 9',
      description: 'An apple mobile which is nothing like apple',
      price: 549,
      category: 'smartphones',
      image: 'https://dummyjson.com/image/i/products/1/1.jpg',
      rating:{rate:5, count:10},
    },
  
  ];

  constructor(private http: HttpClient) {}

  getProduct(): Observable<IProduct[]> {
    //   return this.http.get<IProduct[]>(this._url)
    return of(this.products);
  }
}
