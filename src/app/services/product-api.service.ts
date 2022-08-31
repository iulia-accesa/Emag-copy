import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  private apiUrl = environment.apiUrl;

  constructor() {}

  //TODO: create here all needed API calls for products
}
