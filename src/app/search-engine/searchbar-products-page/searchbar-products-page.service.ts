import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,take,map } from "rxjs";
import { IProduct } from "src/app/shared/product-card/product-card.component.interface";
import { ALL_PRODUCTS } from "../resources/api-endpoints";

@Injectable()
export class SearchbarProductsPageService {

    constructor(private http: HttpClient) {}

    private getAllProducts(): Observable<IProduct[]> {
        return this.http.get<IProduct[]>(ALL_PRODUCTS);
      }


    private productsMatchesSearchKey(product: IProduct,searchKey: string) :boolean {
            return searchKey !== "" && 
                                (product.title.toLowerCase().startsWith(searchKey.toLowerCase()) || 
                                product.title.toLowerCase().split(" ").includes(searchKey.toLowerCase()) ||
                                product.description.toLowerCase().split(" ").includes(searchKey.toLowerCase()) 
                                
                                );
    }  

    filterProductsBySearchKey(searchKey: string): Observable<IProduct[]>{
        return this.getAllProducts().pipe(
            take(1),
            map((products: IProduct[]) => 
               products.filter(product => this.productsMatchesSearchKey(product,searchKey) )
            )
        );
    }
    
}