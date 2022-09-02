import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, Observable, take } from "rxjs";

import { IProductApi } from "src/app/shared/models/product-api.interface";
import { ProductApiService } from "../product-api.service";
import { SearchBarProduct } from "./searchbar-product.interface";
import * as fromSearchActions from 'src/app/services/search/search.actions';
import * as fromSearchSelectors from 'src/app/services/search/search.selectors'
@Injectable()
export class SearchBarService {
 

  constructor(private _productApiService: ProductApiService, private _store: Store, ) {}

  dispatchInputChangedAction(text: string) {
    this._store.dispatch(fromSearchActions.inputChanged({ input: text }));
  }

  selectSearchResult$(): Observable<SearchBarProduct[]> {
    return this._store.select(fromSearchSelectors.searchResult);
  }

  /**
   *
   *{string} @param text
   * @returns 5 SearchBarProduct wich have titles starting with  @param text
   */
  getProductsForSearchBar$(text: string): Observable<SearchBarProduct[]> {
    return this._productApiService.getAll().pipe(
      take(1),
      map((products: IProductApi[]) =>
        products
          .filter((product) => text !== "" && (product.title.toLowerCase().startsWith(text.toLowerCase()) || product.title.toLowerCase().split(" ").includes(text.toLowerCase())) )
          .slice(0, 5)
          .map((product) => {
           
            let searchProduct: SearchBarProduct = {
              id: product.id,
              title: product.title,
              category: product.category,
              rating: {...product.rating},
            };
            return searchProduct;
          })
      )
    );
  }
}
