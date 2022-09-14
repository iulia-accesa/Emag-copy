import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartApiService {
  private apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}
}
