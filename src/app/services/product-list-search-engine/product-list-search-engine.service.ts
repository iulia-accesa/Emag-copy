import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,take,map } from "rxjs";
import { ProductApiService } from "src/app/services/product-api.service";
import { IProduct } from "src/app/shared/components/product-card/product-card.component.interface";


@Injectable()
export class ProductListSearchEngineService {

    constructor(private _productApiService: ProductApiService) {}


    private productsMatchesSearchKey(product: IProduct,searchKey: string) :boolean {
            return searchKey !== "" && 
                                (product.title.toLowerCase().startsWith(searchKey.toLowerCase()) || 
                                product.title.toLowerCase().split(" ").includes(searchKey.toLowerCase()) ||
                                product.description.toLowerCase().split(" ").includes(searchKey.toLowerCase()) 
                                
                                );
    }  

    filterProductsBySearchKey(searchKey: string): Observable<IProduct[]>{
        return this._productApiService.getAll().pipe(
            take(1),
            map((products: IProduct[]) => 
               products.filter(product => this.productsMatchesSearchKey(product,searchKey) )
            )
        );
    }
    
}