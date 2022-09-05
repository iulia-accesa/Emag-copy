import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private categoryUrl = 'https://fakestoreapi.com/products/categories';
    private productsUrl = 'https://fakestoreapi.com/products/category/';
    constructor(private httpClient: HttpClient){
    }

    getCategories(){
        return this.httpClient.get(this.categoryUrl);
    }

    getProducts = (url: string) => {
        console.log(this.productsUrl.concat(url));
        return this.httpClient.get(`${this.productsUrl}${url}`);
        
    }

  }