import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IProduct } from './shared/card-component/card-component.interface';

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
      discountPercentage: 12.96,
      rating: 4.1,
      seller: 'eBay',
      stock: 94,
      brand: 'Apple',
      category: 'smartphones',
      thumbnail: 'https://dummyjson.com/image/i/products/1/thumbnail.jpg',
      images: [
        'https://dummyjson.com/image/i/products/1/1.jpg',
        'https://dummyjson.com/image/i/products/1/2.jpg',
        'https://dummyjson.com/image/i/products/1/3.jpg',
        'https://dummyjson.com/image/i/products/1/4.jpg',
        'https://dummyjson.com/image/i/products/1/thumbnail.jpg',
      ],
    },
    {
      id: 2,
      title: 'Samsung 9',
      description: 'An apple mobile which is nothing like apple',
      price: 1549,
      discountPercentage: 12.96,
      rating: 3.1,
      seller: 'AliExpress',
      stock: 194,
      brand: 'Samsung',
      category: 'smartphones',
      thumbnail: 'https://dummyjson.com/image/i/products/1/thumbnail.jpg',
      images: [
        'https://dummyjson.com/image/i/products/1/1.jpg',
        'https://dummyjson.com/image/i/products/1/2.jpg',
        'https://dummyjson.com/image/i/products/1/3.jpg',
        'https://dummyjson.com/image/i/products/1/4.jpg',
        'https://dummyjson.com/image/i/products/1/thumbnail.jpg',
      ],
    },
  ];

  constructor(private http: HttpClient) {}

  getProduct(): Observable<IProduct[]> {
    //   return this.http.get<IProduct[]>(this._url)
    return of(this.products);
  }
}
