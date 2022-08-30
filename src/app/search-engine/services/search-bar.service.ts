import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, race, take } from 'rxjs';
import { Product, ProductRating } from '../models/product';
import { SearchBarProduct } from '../models/search-bar.product';
import * as fromApi from '../resources/api-endpoints';

@Injectable()
export class SearchBarService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(fromApi.ALL_PRODUCTS);
  }

  /**
   *
   *{string} @param text
   * @returns 5 SearchBarProduct wich have titles starting with  @param text
   */
  getProductsForSearchBar(text: string): Observable<SearchBarProduct[]> {
    return this.getAllProducts().pipe(
      take(1),
      map((products: Product[]) =>
        products
          .filter((product) => text !== "" && (product.title.toLowerCase().startsWith(text) || product.title.toLowerCase().split(" ").includes(text)) )
          .slice(0, 5)
          .map((product) => {
           
            let searchProduct: SearchBarProduct = {
              id: product.id,
              title: product.title,
              category: product.category,
              rating: product.rating,
            };
            return searchProduct;
          })
      )
    );
  }
}
