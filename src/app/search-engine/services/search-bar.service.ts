import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from '../models/product';
import { SearchBarProduct } from '../models/search-bar.product';
import * as fromApi from '../resources/api-endpoints';

@Injectable()
export class SearchBarService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(fromApi.ALL_PRODUCTS);
  }

  //populates the store with the available products for search
  getProductsForSearchBar(text: string) {
    this.getAllProducts().subscribe((products: Product[]) => {
      let searchResult:SearchBarProduct[] =  products.map((product) => {
        let searchProduct: SearchBarProduct = {
          id: product.id,
          title: product.title,
          category: product.category,
          rating: product.rating,
        };
        return searchProduct;
      });

      

    });
  }
}
