import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IProductApi } from '../shared/models/product-api.interface';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private _apiUrl = environment.apiUrl;
  private _productsUrl = this._apiUrl + "/product";
  private _categoriesUrl = this._apiUrl + "/categories";
  private _categoryUrl = this._apiUrl + "/products/category";
  
  

  constructor(private _httpClient: HttpClient) {}

  getAll(): Observable<IProductApi[]>{
      return this._httpClient.get<IProductApi[]>(this._productsUrl);
  }

  getAllCategories(): Observable<string[]>  {
      return this._httpClient.get<string[]>(this._categoriesUrl);
  }

  /**
   * 
   * @param category 
   * RETURN products included in @parama category  
   */
  getByCategory(category: string): Observable<IProductApi[]>{
    return this._httpClient.get<IProductApi[]>(this._categoryUrl + "/" + category);
  }

}
