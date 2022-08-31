import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,take,map } from "rxjs";
import { Product } from "../models/product";
import { ALL_PRODUCTS } from "../resources/api-endpoints";

@Injectable()
export class SearchbarProductsPageService {

    constructor(private http: HttpClient) {}

    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(ALL_PRODUCTS);
      }


    private productsMatchesSearchKey(product: Product,searchKey: string) :boolean {
            return searchKey !== "" && 
                                (product.title.toLowerCase().startsWith(searchKey.toLowerCase()) || 
                                product.title.toLowerCase().split(" ").includes(searchKey.toLowerCase()) ||
                                product.description.toLowerCase().split(" ").includes(searchKey.toLowerCase()) 
                                
                                );
    }  

    filterProductsBySearchKey(searchKey: string): Observable<Product[]>{
        return this.getAllProducts().pipe(
            take(1),
            map((products: Product[]) => 
               products.filter(product => this.productsMatchesSearchKey(product,searchKey) )
            )
        );
    }
    
}