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

  constructor(private _httpClient: HttpClient) {}

  getAll(): Observable<IProductApi[]> {
    return this._httpClient.get<IProductApi[]>(`${this._apiUrl}/products`);
  }
  getById(id: number): Observable<IProductApi> {
    return this._httpClient.get<IProductApi>(`${this._apiUrl}/products/${id}`);
  }

  getAllCategories(): Observable<string[]> {
    return this._httpClient.get<string[]>(`${this._apiUrl}/products/categories`);
  }



  /**
   *
   * @param category
   * RETURN products included in @parama category
   */
  getByCategory(category: string): Observable<IProductApi[]> {
    return this._httpClient.get<IProductApi[]>(
      `${this._apiUrl}/products/category/${category}`
    );
  }

}
