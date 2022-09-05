import { Injectable } from "@angular/core";

import { Observable,take,map } from "rxjs";
import { ProductApiService } from "src/app/services/product-api.service";
import { IProductApi } from "src/app/shared/models/product-api.interface";



@Injectable()
export class ProductListSearchEngineService {

    constructor(private _productApiService: ProductApiService) {}


    private productsMatchesSearchKey(product: IProductApi,searchKey: string) :boolean {
            return searchKey !== "" && 
                                (product.title.toLowerCase().startsWith(searchKey.toLowerCase()) || 
                                product.title.toLowerCase().split(" ").includes(searchKey.toLowerCase()) ||
                                product.description.toLowerCase().split(" ").includes(searchKey.toLowerCase()) 
                                
                                );
    }  

    filterProductsBySearchKey$(searchKey: string): Observable<IProductApi[]>{
        return this._productApiService.getAll().pipe(
            map((products: IProductApi[]) => 
               products.filter(product => this.productsMatchesSearchKey(product,searchKey) )
            )
        );
    }
    
}