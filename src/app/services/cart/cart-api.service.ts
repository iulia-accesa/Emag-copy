import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ICart } from './../../shared/models/cart.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  placeOrder(order: ICart): Observable<ICart> {
    return this.httpClient.post<ICart>(`${this.apiUrl}/carts`, {
      order,
    });
  }
}
