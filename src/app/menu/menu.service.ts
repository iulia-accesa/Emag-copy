import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class MenuService {
    private categoryUrl = 'https://fakestoreapi.com/products/categories';
    private productsUrl = 'https://fakestoreapi.com/products/category/{{categ}}'
    // private electronicsUrl = 'https://fakestoreapi.com/products/category/electronics';
    // private jeweleryUrl = 'https://fakestoreapi.com/products/category/jewelery';
    // private menClothingUrl = 'https://fakestoreapi.com/products/category/mensclothing';
    // private womenClothingUrl = 'https://fakestoreapi.com/products/category/womensclothing';

    constructor(private httpClient: HttpClient){
    }

    getCategories(){
        return this.httpClient.get(this.categoryUrl);
    }

    getProducts() {
        return this.httpClient.get(this.productsUrl);
    }
    
    // getElectronics(){
    //     return this.httpClient.get(this.electronicsUrl);
    //     // console.log(this.getCategories);
    // }

    // getJewelery(){
    //     return this.httpClient.get(this.jeweleryUrl);
    // }

    // getMensClothing(){
    //     return this.httpClient.get(this.menClothingUrl);
    // }

    // getWomensClothing(){
    //     return this.httpClient.get(this.womenClothingUrl);
    // }

  }