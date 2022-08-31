import { Injectable } from "@angular/core";
import { map, take } from "rxjs";
import { ProductApiService } from "../product-api.service";

@Injectable()
export class SearchBarService {
  constructor(private _productApiService: ProductApiService ) {}



  /**
   *
   *{string} @param text
   * @returns 5 SearchBarProduct wich have titles starting with  @param text
   */
  getProductsForSearchBar(text: string): Observable<SearchBarProduct[]> {
    return this._productApiService.getAllProducts().pipe(
      take(1),
      map((products: Product[]) =>
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
