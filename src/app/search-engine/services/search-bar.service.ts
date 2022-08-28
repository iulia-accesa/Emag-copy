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

  //populates the store with the available products for search
  getProductsForSearchBar(text: string):Observable<SearchBarProduct[]> {
    return this.getAllProducts().pipe(
      take(1),
      map((products: Product[]) => products
        .filter(product => product.title.toLowerCase().startsWith(text))
        .map(product =>
            {
            let searchProduct: SearchBarProduct = {id:product.id,
              title:product.title,
              category:product.category,
              rating:product.rating
            }
            return searchProduct;
          }
        
        )
      )
    );
    
  }
}
